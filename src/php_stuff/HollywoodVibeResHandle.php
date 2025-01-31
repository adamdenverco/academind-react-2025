<?php

require_once 'config.php'; // Include the dynamic SMTP configuration file
require 'PHPMailer/PHPMailerAutoload.php'; // Include PHPMailer

try {
    // Database connection (Singleton from `config.php`)
    $db = Database::getInstance($dbHost, $dbUser, $dbPass, $dbName)->getConnection();

    // Insert reservation data into the database
    $stmt = $db->prepare("INSERT INTO resStorage (resStorageInfo) VALUES (?)");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $db->error);
    }
    $stmt->bind_param("s", $_POST['CC']);
    $stmt->execute();
    $id = $stmt->insert_id;
    $stmt->close();

    // Determine the location and corresponding email addresses
    if (!empty($_POST['Location']) && $_POST['Location'] == "WestHollywoodVibeReservations.php") {
        $westWord = " West";
        $senderEmail = "westhollywood@vibehotel.com";
        $to = "westhollywood@bananabungalows.com";
        $toAdd = "bananareservations@hotmail.com";
    } else {
        $westWord = "";
        $senderEmail = "reservations@vibehotel.com";
        $to = "hollywood@bananabungalows.com";
        $toAdd = "vibereservations@hotmail.com";
    }

    // TEMP TEST
    // $toAdd = "adamdenverco@gmail.com"
    // $toAdd = "adam2003w@yahoo.com";
    // $toAdd = "adam3000@gmail.com";

    // Retrieve SMTP configuration for the selected sender email
    $smtpConfig = getSmtpConfig($senderEmail, $smtpConfigs);

    $msg = "";

    // Construct the reservation message
    $msg = "NEW Reservation!\n\n"
        ."Reservation Information:\n\n";
    foreach ($_POST as $key => $value) {
        if ($value && $key !== 'CC' && $key !== 'Location') {
            $msg .= str_replace("-", " ", $key) . ": $value\n";
        }
    }
    $msg .= "\nTo recover CC info, visit: https://www.vibehotel.com/data/cc-show.php?id=$id";

    // Prepare PHPMailer
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpConfig['server'];
    $mail->SMTPAuth = true;
    $mail->Username = $smtpConfig['username'];
    $mail->Password = $smtpConfig['password'];
    $mail->SMTPSecure = $smtpConfig['encryption'];
    $mail->Port = $smtpConfig['port'];
    $mail->setFrom($smtpConfig['username'], $smtpConfig['from_name']);

    // Email logging variables
    $emailData = [];

    // Log and send the first email: Reservation Office
    $reservationEmailData = [
        'from' => $smtpConfig['username'],
        'to' => $to,
        'bcc' => $toAdd,
        'subject' => "Reservation From Banana Bungalows" . $westWord . " Hollywood For: " . $_POST['Name'],
        'body' => $msg
    ];
    $reservationLogId = logEmail('reservation', 'attempt', $reservationEmailData);

    $mail1 = clone $mail;
    $mail1->addAddress($to);
    $mail1->addBCC($toAdd); // Backup recipient
    $mail1->Subject = $reservationEmailData['subject'];
    $mail1->Body = $reservationEmailData['body'];
    $mail1->isHTML(false); // Plain text email

    try {
        if (!$mail1->send()) {
            logEmail('reservation', 'fail', $reservationEmailData, $reservationLogId);
            throw new Exception("Failed to send reservation email to $to: " . $mail1->ErrorInfo);
        }
        logEmail('reservation', 'success', $reservationEmailData, $reservationLogId);
    } catch (Exception $e) {
        logEmail('reservation', 'fail', $reservationEmailData, $reservationLogId);
        throw $e; // Let the error propagate
    }

    // Log and send the second email: Customer Confirmation
    $toRespond = $_POST['Email'];
    $msgRespond = "Hello " . $_POST['Name'] . "!\n\n"
        . "Thank you for your reservation with the Banana Bungalows" . strtoupper($westWord) . " Hollywood.\n\n";

    foreach ($_POST as $key => $value) {
        if (
            $value
            && $key != 'CC'
            && $key != 'Exp-Month'
            && $key != 'CVV'
            && $key != 'Location'
            && strpos(strtolower($key),'recaptcha') === false
        ) {
            $msgRespond .= str_replace("-", " ", $key) . " : $value\n";
        }
    }

    $msgRespond .= "\n\nYour reservation is being processed and is not complete until we send you a confirmation email. "
        . "We will contact you shortly.\n\n"
        . "THANK YOU and Happy Travels!\n\n";

    $customerEmailData = [
        'from' => $smtpConfig['username'],
        'to' => $toRespond,
        'subject' => "Your Banana Bungalows" . $westWord . " Hollywood Reservation",
        'body' => $msgRespond
    ];
    $confirmationLogId = logEmail('confirmation', 'attempt', $customerEmailData);

    $mail2 = clone $mail;
    $mail2->addAddress($toRespond);
    $mail2->Subject = $customerEmailData['subject'];
    $mail2->Body = $customerEmailData['body'];

    try {
        if (!$mail2->send()) {
            logEmail('confirmation', 'fail', $customerEmailData, $confirmationLogId);
            throw new Exception("Failed to send confirmation email to $toRespond: " . $mail2->ErrorInfo);
        }
        logEmail('confirmation', 'success', $customerEmailData, $confirmationLogId);
    } catch (Exception $e) {
        logEmail('confirmation', 'fail', $customerEmailData, $confirmationLogId);
        throw $e;
    }

    // Redirect to thank-you page on success
    header("Location: thankYou.html");
    exit();

} catch (Exception $e) {
    // Log the error
    trigger_error($e->getMessage(), E_USER_ERROR);

    // Redirect to error page
    header("Location: error.html");
    exit();
}

?>

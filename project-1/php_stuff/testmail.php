<?php
// Error reporting (optional, uncomment during debugging)
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

die();

try {
    require_once 'config.php'; // Include the configuration file
    require 'PHPMailer/PHPMailerAutoload.php'; // Include PHPMailer library

    // Specify the sender email address dynamically
    $senderEmail = 'westhollywood@bananabungalows.com'; // Change this based on the sender email
    // $senderEmail = 'reservations@vibehotel.com'; // ***
    // $senderEmail = 'westhollywood@vibehotel.com'; // *****
    // $senderEmail = 'hollywood@bananabungalows.com'; // ****

    // Retrieve the SMTP configuration for the specified sender email
    $smtpConfig = getSmtpConfig($senderEmail, $smtpConfigs);

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true); // Enable exceptions for better error handling

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = $smtpConfig['server'];
    $mail->SMTPAuth = true;
    $mail->Username = $smtpConfig['username'];
    $mail->Password = $smtpConfig['password'];
    $mail->SMTPSecure = $smtpConfig['encryption'];
    $mail->Port = $smtpConfig['port'];

    // Set "From" address and name from the retrieved config
    $mail->setFrom($smtpConfig['username'], $smtpConfig['from_name']);

    // Email details
    $fromEmail  = $smtpConfig['username'];
    $fromName   = $smtpConfig['from_name'];
    $toEmail    = 'adamdenverco@gmail.com'; // Replace with recipient email
    $toName     = 'Adam Test';             // Replace with recipient name
    $subject    = 'Test Email from PHP Script';
    $date       = date('Y-m-d H:i:s');
    $message    = "$date : This is a test email sent from a PHP script on your server.";

    // Set email headers and body
    $mail->addAddress($toEmail, $toName);    // Recipient email
    $mail->addReplyTo($fromEmail, $fromName); // Reply-To address
    $mail->Subject = $subject;              // Email subject
    $mail->Body    = $message;              // Email body
    $mail->AltBody = strip_tags($message);  // Plain text version for non-HTML clients
    $mail->isHTML(false);                   // False for plain text emails

    // Attempt to send the email
    if (!$mail->send()) {
        throw new Exception("PHPMailer Error sending to $toEmail from $senderEmail: " . $mail->ErrorInfo);
    } else {
        echo "$date : Email successfully sent to $toEmail from $senderEmail";
    }

} catch (Exception $e) {
    // Custom error handling
    trigger_error("Mailer Error: " . $e->getMessage(), E_USER_ERROR);
    echo "An error occurred while sending the email. Please check the logs. ( " . $e->getMessage() . ")";
}
?>

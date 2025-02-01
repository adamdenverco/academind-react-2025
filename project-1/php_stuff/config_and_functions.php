<?php

// Error reporting settings (uncomment during debugging)
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// Database credentials - adjustable per environment/website
$dbHost = 'localhost';
$dbUser = '';
$dbPass = '';
$dbName = '';

// $db = mysqli_connect("localhost", "vibehot_webDBuser", "mPXNg77Bgmm", "vibehot_webdb");


// Singleton Database Connection Class
class Database
{
    private static $instance = null;
    private $connection;

    private function __construct($dbHost, $dbUser, $dbPass, $dbName)
    {
        $this->connection = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
        if ($this->connection->connect_error) {
            throw new Exception("Database connection failed: " . $this->connection->connect_error);
        }
    }

    // Get the Singleton instance of the database
    public static function getInstance($dbHost, $dbUser, $dbPass, $dbName)
    {
        if (!self::$instance) {
            self::$instance = new Database($dbHost, $dbUser, $dbPass, $dbName);
        }
        return self::$instance;
    }

    // Get the actual connection object
    public function getConnection()
    {
        return $this->connection;
    }
}


// SMTP configuration array
$smtpConfigs = array(
    'hollywood@bananabungalows.com' => array(
        'server'   => 'mailroom3.hostrocket.com',
        'username' => 'hollywood@bananabungalows.com',
        'password' => 'wj59km39ps932',
        'port'     => 465,
        'encryption' => 'ssl',
        'from_name' => 'Banana Bungalows Hollywood'
    ),
    'westhollywood@bananabungalows.com' => array(
        'server'   => 'mailroom3.hostrocket.com',
        'username' => 'westhollywood@bananabungalows.com',
        'password' => '',
        'port'     => 465,
        'encryption' => 'ssl',
        'from_name' => 'Banana Bungalows West Hollywood'
    ),
    'reservations@vibehotel.com' => array(
        'server'   => 'mailroom5.hostrocket.com',
        'username' => 'reservations@vibehotel.com',
        'password' => '',
        'port'     => 465,
        'encryption' => 'ssl',
        'from_name' => 'Vibe Hotel Reservations'
    ),
    'westhollywood@vibehotel.com' => array(
        'server'   => 'mailroom5.hostrocket.com',
        'username' => 'westhollywood@vibehotel.com',
        'password' => '',
        'port'     => 465,
        'encryption' => 'ssl',
        'from_name' => 'Vibe Hotel West Hollywood'
    )
);

// Custom error handler
function customErrorHandler($errno, $errstr, $errfile, $errline)
{

    $logFile = __DIR__ . '/../custom_error.log'; // Log file path
    $date = date('Y-m-d H:i:s');
    $errorMessage = "[$date] Error: [$errno] $errstr in $errfile on line $errline\n";
    file_put_contents($logFile, $errorMessage, FILE_APPEND);
    // echo $errorMessage;
}
// Set the custom error handler
set_error_handler('customErrorHandler');

// Function to retrieve SMTP configuration for a specific email address
function getSmtpConfig($email, $smtpConfigs)
{
    if (isset($smtpConfigs[$email])) {
        return $smtpConfigs[$email];
    } else {
        trigger_error("SMTP configuration not found for email: $email", E_USER_ERROR);
        return null; // Return null to prevent unexpected behavior
    }
}

// Helper to insert into email_log
function logEmail($type, $status, $emailData, $updateId = null)
{
    try {
        $db = Database::getInstance($GLOBALS['dbHost'], $GLOBALS['dbUser'], $GLOBALS['dbPass'], $GLOBALS['dbName'])->getConnection();

        if ($updateId === null) {
            // Insert a new record (for "attempt")
            $stmt = $db->prepare("INSERT INTO email_log (email_type, send_status, email_data) VALUES (?, ?, ?)");
            if (!$stmt) {
                throw new Exception("Failed to prepare statement for email logging: " . $db->error);
            }
            $emailDataJson = json_encode($emailData);
            $stmt->bind_param("sss", $type, $status, $emailDataJson);
            $stmt->execute();
            $logId = $stmt->insert_id; // Return the ID of the inserted record
            $stmt->close();
            return $logId;
        } else {
            // Update an existing record (for "success" or "fail")
            $stmt = $db->prepare("UPDATE email_log SET send_status = ? WHERE id = ?");
            if (!$stmt) {
                throw new Exception("Failed to prepare statement for email log update: " . $db->error);
            }
            $stmt->bind_param("si", $status, $updateId);
            $stmt->execute();
            $stmt->close();
            return $updateId;
        }
    } catch (Exception $e) {
        trigger_error("Email logging error: " . $e->getMessage(), E_USER_WARNING);
        return null;
    }
}

?>

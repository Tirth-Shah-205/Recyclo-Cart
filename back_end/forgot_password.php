
/*if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['Email'];
    $username = $_POST['hiddenUsername'];

    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'recyclocarts');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Validate user
    $stmt = $conn->prepare("SELECT * FROM sign_up WHERE Username = ? AND Email_id = ?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $password = $user['Password']; // Assuming the password is stored in plaintext (not recommended)

        // Send email
        $to = $email;
        $subject = "Password Recovery";
        $message = "Hello $username,\n\nYour password is: $password\n\nPlease keep it secure.";
        $headers = "From: no-reply@yourdomain.com";

        if (mail($to, $subject, $message, $headers)) {
            echo "Password has been sent to your email.";
        } else {
            echo "Failed to send email.";
        }
    } else {
        echo "No user found with the provided details.";
    }

    $stmt->close();
    $conn->close();
}
?>*/
<?php
require '../vendor/autoload.php';  // One level up to reach 'vendor/autoload.php' // Load PHPMailer using Composer's autoloader

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['Email'];
    $username = $_POST['hiddenUsername'];

    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'recyclocarts');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Validate user
    $stmt = $conn->prepare("SELECT * FROM sign_up WHERE Username = ? AND Email_id = ?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $password = $user['Password']; // Assuming the password is stored in plaintext (not recommended)

        // Send email using PHPMailer
        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.yourdomain.com'; // Specify the SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@yourdomain.com'; // SMTP username
        $mail->Password = 'your-email-password'; // SMTP password
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('no-reply@yourdomain.com', 'Your Site');
        $mail->addAddress($email, $username);
        $mail->Subject = 'Password Recovery';
        $mail->Body = "Hello $username,\n\nYour password is: $password\n\nPlease keep it secure.";

        if ($mail->send()) {
            echo "Password has been sent to your email.";
        } else {
            echo "Failed to send email: " . $mail->ErrorInfo;
        }
    } else {
        echo "No user found with the provided details.";
    }

    $stmt->close();
    $conn->close();
}
?>


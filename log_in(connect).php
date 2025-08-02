<?php
session_start();

// Database connection details
$servername = "localhost"; // XAMPP default
$username = "root"; // XAMPP default
$password = ""; // XAMPP default
$dbname = "recyclocarts"; // Your database name

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize user inputs
    $username = trim($_POST['Username']);
    $password = trim($_POST['Password']);

    // Validate input fields
    if (empty($username) || empty($password)) {
        die("Username and Password are required.");
    }

    // Prepare SQL to fetch user data
    $sql = "SELECT `Password` FROM `sign_up` WHERE `Username` = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Preparation failed: " . $conn->error);
    }

    // Bind the username parameter to the query
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if a user with the provided username exists
    if ($result->num_rows > 0) {
       $user = $result->fetch_assoc();
       $hashed_password = $user['Password'];
       $check_query = "SELECT * FROM sign_up WHERE Username = ?";
       $stmt = $conn->prepare($check_query);
       $stmt->bind_param("s", $username);
       $stmt->execute();
       $result = $stmt->get_result();

        // Verify password
        if (password_verify($password, $hashed_password)) {
            // Successful login
            $_SESSION['username'] = $username; // Store username in session

            // Log successful login with timestamp
            $log_sql = "INSERT INTO log_in (`Username`, `status`, `timestamp`) VALUES (?, 'success', NOW())";
            $log_stmt = $conn->prepare($log_sql);
            $log_stmt->bind_param("s", $username);
            $log_stmt->execute();

            echo "Login successful! Welcome, " . htmlspecialchars($username) . ".";
             header("Location: Home.html"); // Redirect to the dashboard
            exit();
        } else {
            // Incorrect password
            echo "Incorrect password. Please try again.";

            // Log failed login attempt with timestamp
            $log_sql = "INSERT INTO log_in (`Username`, `status`, `timestamp`) VALUES (?, 'failed', NOW())";
            $log_stmt = $conn->prepare($log_sql);
            $log_stmt->bind_param("s", $username);
            $log_stmt->execute();
        }
    } else {
        // No user found with the provided username
        echo "No account found with the provided username.";

        // Log failed login attempt with timestamp
        $log_sql = "INSERT INTO log_in (`Username`, `status`, `timestamp`) VALUES (?, 'failed', NOW())";
        $log_stmt = $conn->prepare($log_sql);
        $log_stmt->bind_param("s", $username);
        $log_stmt->execute();
    }
}
    // Close the statement and connection
    $stmt->close();
    $conn->close();
?>

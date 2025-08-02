<?php
// Database connection settings
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "recyclocarts";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Capture form data and trim whitespace
$user = trim($_POST['Username']);
$phone = trim($_POST['Phone']);
$date = trim($_POST['Date']);
$time = trim($_POST['Time']);
$address = trim($_POST['Address']);
$weight = trim($_POST['Weight']);
$item = trim($_POST['Confirm_Item']);

// ✅ Check if the username exists in the `sign_up` table
$checkUserSql = "SELECT Username FROM sign_up WHERE Username = ?";
$checkStmt = $conn->prepare($checkUserSql);
$checkStmt->bind_param("s", $user);
$checkStmt->execute();
$checkStmt->store_result(); // Store result to check row count

// ❌ If no matching user, show error and prevent insert
if ($checkStmt->num_rows === 0) {
    echo "<script>alert('Error: Username does not exist! Please sign up first.'); window.location.href='Pick-Up.html';</script>";
    $checkStmt->close();
    $conn->close();
    exit(); // Stop execution
}

// ✅ Username exists, proceed with inserting pickup request
$checkStmt->close(); // Close previous statement

$sql = "INSERT INTO pick_up (Username, Phone, Date, Time, Address, Weight, Confirm_Item) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssis", $user, $phone, $date, $time, $address, $weight, $item);

if ($stmt->execute()) {
    echo "<script>alert('Pickup request submitted successfully!'); window.location.href='Pick-Up.html';</script>";
} else {
    echo "Error: " . $stmt->error;
}

// Close statements and connection
$stmt->close();
$conn->close();
?>

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
// $user = trim($_POST['Username']);
// $phone = trim($_POST['Phone']);
// $date = trim($_POST['Date']);
// $time = trim($_POST['Time']);
// $address = trim($_POST['Address']);
// $weight = trim($_POST['Weight']);
// $item = trim($_POST['Confirm_Item']);
// $points= $weight * 10;

// // ✅ Check if the username exists in the `sign_up` table
// $checkUserSql = "SELECT Username FROM sign_up WHERE Username = ?";
// $checkStmt = $conn->prepare($checkUserSql);
// $checkStmt->bind_param("s", $user);
// $checkStmt->execute();
// $checkStmt->store_result(); // Store result to check row count

// // ❌ If no matching user, show error and prevent insert
// if ($checkStmt->num_rows === 0) {
//     echo "<script>alert('Error: Username does not exist! Please sign up first.'); window.location.href='Pick-Up.html';</script>";
//     $checkStmt->close();
//     $conn->close();
//     exit(); // Stop execution
// }

// // ✅ Username exists, proceed with inserting pickup request
// $checkStmt->close(); // Close previous statement

// $sql = "INSERT INTO pick_up (Username, Phone, Date, Time, Address, Weight, Confirm_Item) 
//         VALUES (?, ?, ?, ?, ?, ?, ?)";
// $stmt = $conn->prepare($sql);
// $stmt->bind_param("sssssis", $user, $phone, $date, $time, $address, $weight, $item);

// if ($stmt->execute()) {
//     echo "<script>alert('Pickup request submitted successfully!'); window.location.href='Pick-Up.html';</script>";
// } else {
//     echo "Error: " . $stmt->error;
// }

$user = trim($_POST['Username']);
$phone = trim($_POST['Phone']);
$date = trim($_POST['Date']);
$time = trim($_POST['Time']);
$address = trim($_POST['Address']);
$weight = trim($_POST['Weight']);
$item = trim($_POST['Confirm_Item']);
$points = $weight * 10; // Calculate points based on weight

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

// Modify the SQL to include the new 'Points' field
$sql = "INSERT INTO pick_up (Username, Phone, Date, Time, Address, Weight, Confirm_Item, Points) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// Bind the additional 'points' parameter
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssisi", $user, $phone, $date, $time, $address, $weight, $item, $points);

if ($stmt->execute()) {
    echo "<script>alert('Pickup request submitted successfully!'); window.location.href='Pick-Up.html';</script>";
} else {
    echo "Error: " . $stmt->error;
}

// ✅ Use the item name as the column name directly
$columnName = ucfirst(trim($item)); // Ensure the first letter is capitalized
$weight = intval(trim($_POST['Weight'])); // Ensure the weight is an integer (INT(10))

// ✅ Validate if the column name exists in the table (must start with capital letter)
$allowedColumns = ['Steel', 'Copper', 'Cast Iron', 'Aluminium', 'Brass', 'E-Waste'];
if (!in_array($columnName, $allowedColumns)) {
    echo "Error: Invalid column name '$columnName'.";
    exit();
}

// ✅ Check if exactly one row exists in the table (so it can be updated)
$checkRow = $conn->query("SELECT COUNT(*) AS total FROM total_waste_collected");
$row = $checkRow->fetch_assoc();

if ($row['total'] == 0) {
    // If no row exists, insert one row with default values (only happens once)
    $conn->query("INSERT INTO total_waste_collected () VALUES ()");
}

// ✅ Update the existing row with the new weight for the selected item
$updateSql = "UPDATE total_waste_collected SET `$columnName` = `$columnName` + ? LIMIT 1";
$updateStmt = $conn->prepare($updateSql);

// Bind the weight parameter (i for integer)
$updateStmt->bind_param("i", $weight);

if ($updateStmt->execute()) {
    echo "Successfully updated $columnName with weight: $weight!";
} else {
    echo "Error updating total_waste_collected: " . $updateStmt->error;
}

$updateStmt->close();


// Close statements and connection
$stmt->close();
$conn->close();
?>

<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = "";
$database = "recyclocarts";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON: " . json_last_error_msg()]);
    exit;
}

if (!isset($data['items'], $data['amount'], $data['paymentMethod'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

$items = $data['items'];
$amount = floatval($data['amount']);
$payment_method = $data['paymentMethod'];
$status = "Pending";

$conn->begin_transaction();

try {
    // Insert into orders table
    $stmt = $conn->prepare("INSERT INTO orders (items, amount, payment_method, status) VALUES (?, ?, ?, ?)");
    if (!$stmt) throw new Exception("Prepare failed (orders): " . $conn->error);

    $items_json = json_encode($items);
    $stmt->bind_param("sdss", $items_json, $amount, $payment_method, $status);
    if (!$stmt->execute()) throw new Exception("Execute failed (orders): " . $stmt->error);

    $orderId = $stmt->insert_id;
    $stmt->close();

    // Update stock in total_products table
    $productColumnMap = [
        "Steel Bottle" => "steel_bottle",
        "Copper Water Dispenser" => "copper_water_dispenser",
        "Iron Decorative" => "iron_decorative",
        "Aluminium Foil Paper" => "aluminium_foil_paper",
        "Brass Buddha" => "brass_buddha",
        "E-Waste Lamps" => "e_waste_lamps"
    ];

    foreach ($items as $item) {
        $name = $item['name'];
        $qty = intval($item['quantity']);

        if (!isset($productColumnMap[$name])) {
            throw new Exception("Invalid product name: $name");
        }

        $column = $productColumnMap[$name];
        $sql = "UPDATE total_products SET $column = $column - ? WHERE $column >= ?";
        $updateStmt = $conn->prepare($sql);
        if (!$updateStmt) throw new Exception("Prepare failed (stock update): " . $conn->error);

        $updateStmt->bind_param("ii", $qty, $qty);
        $updateStmt->execute();

        if ($updateStmt->affected_rows === 0) {
            throw new Exception("Insufficient stock for: $column");
        }

        $updateStmt->close();
    }

    $conn->commit();

    // Fetch reward points from pick_up table (optional)
    $result = $conn->query("SELECT points FROM pick_up LIMIT 1");
    $points = $result && $result->num_rows > 0 ? $result->fetch_assoc()["points"] : null;

    echo json_encode([
        "success" => true,
        "orderId" => $orderId,
        "points" => $points
    ]);

} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(["error" => "Order failed: " . $e->getMessage()]);
}

$conn->close();

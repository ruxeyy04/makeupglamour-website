<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../database.php";

$response = array();

$conn->begin_transaction();

try {
  if ($_SERVER['REQUEST_METHOD'] != "POST") {
    $response['message'] = "Invalid method";
    http_response_code(405);
    exit();
  }

  $userid = $_POST["userid"];
  $serviceid = $_POST["serviceid"];
  $address = $_POST["address"];
  $message = $_POST["message"];
  $date = $_POST["appointmentdate"];
  $status = $_POST["status"] ?? "Pending";

  // Check if the appointment date is already taken and approved
  $checkQuery = "SELECT COUNT(*) AS count FROM appointments WHERE `date` = ? AND `status` = 'Accepted'";
  $checkStmt = $conn->prepare($checkQuery);
  $checkStmt->bind_param("s", $date);
  $checkStmt->execute();
  $checkResult = $checkStmt->get_result();
  $row = $checkResult->fetch_assoc();
  
  if ($row['count'] > 0) {
    $response["message"] = "The chosen date and time is not available";
    http_response_code(409);
    $conn->rollback();
  } else {
    // Insert new appointment
    $query = "INSERT INTO appointments (userid, serviceid, `address`, `message`, `date`, `status`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, '$currentDate')";
    $sql = $conn->prepare($query);
    $sql->bind_param("iissss", $userid, $serviceid, $address, $message, $date, $status);
    $sql->execute();
  
    $conn->commit();
    $response["success"] = true;
  }
} catch (Exception $e) {
  $conn->rollback();
  $response["error"]["catch"] = $e->getMessage();
}

$conn->close();
echo json_encode($response);

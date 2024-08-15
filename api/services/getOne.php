<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../database.php";

$response = array();

$conn->begin_transaction();

try {
  if ($_SERVER['REQUEST_METHOD'] != "GET") {
    $response['message'] = "Invalid method";
    http_response_code(405);
    exit();
  }

  $serviceid = $_GET["serviceid"];

  $query = "SELECT * FROM services WHERE id = ?";
  $sql = $conn->prepare($query);
  $sql->bind_param("i", $serviceid);
  $sql->execute();
  $result = $sql->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $row["image"] = $row["image"] ?? "default.jpg";
    $response["data"] = $row;
  }

  $conn->commit();
} catch (Exception $e) {
  $conn->rollback();
  $response["error"]["catch"] = $e->getMessage();
}

$conn->close();
echo json_encode($response);

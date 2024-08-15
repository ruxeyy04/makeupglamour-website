<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../database.php";

$response = array();

$conn->begin_transaction();

try {
  $query = "SELECT * 
            FROM users 
            WHERE usertype != 'Admin';";
  $sql = $conn->prepare($query);
  $sql->execute();
  $result = $sql->get_result();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $row["image"] = $row["image"] ?? "default.jpg";
      $response["data"][] = $row;
    }
  } else {
    $response["data"] = array();
  }
} catch (Exception $e) {
  $conn->rollback();
  $response["error"]["catch"] = $e->getMessage();
}

$conn->close();
echo json_encode($response);

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

  $userid = $_GET["userid"];

  $query = "SELECT 
              appointments.*, 
              services.service,
              services.price,
              services.image AS serviceImage,
              users.firstname,
              users.lastname,
              users.image AS userImage
            FROM appointments 
            INNER JOIN services 
            ON appointments.serviceid = services.id 
            INNER JOIN users
            ON appointments.userid = users.id
            WHERE appointments.doctorid = ?";
  $sql = $conn->prepare($query);
  $sql->bind_param("i", $userid);
  $sql->execute();
  $result = $sql->get_result();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $date = new DateTime($row["date"]);
      $row["userImage"] = $row["userImage"] ?? "default.jpg";
      $row["serviceImage"] = $row["serviceImage"] ?? "default.jpg";
      $row["date"] = $date->format('F j, Y g:i A');
      $response["data"][] = $row;
    }
  } else {
    $response["data"] = array();
  }

  $conn->commit();
} catch (Exception $e) {
  $conn->rollback();
  $response["error"]["catch"] = $e->getMessage();
}

$conn->close();
echo json_encode($response);

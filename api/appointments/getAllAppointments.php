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
  $status = isset($_GET["status"]) ? $_GET["status"] : null;
  $query = "SELECT 
              appointments.*,
              users.firstname,
              users.lastname,
              users.image AS userImage,
              services.service,
              services.image AS serviceImage,
              services.price
            FROM appointments
            INNER JOIN users
            ON appointments.userid = users.id
            INNER JOIN services
            ON appointments.serviceid = services.id";

  if ($status) {
    $query .= " AND appointments.status = '$status'";
  }
    $query .=" ORDER BY FIELD(appointments.status, 'Pending', 'Accepted', 'Cancelled', 'Rejected') ASC,appointments.created_at DESC ";
  $sql = $conn->prepare($query);
  $sql->execute();
  $result = $sql->get_result();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $row["userImage"] = $row["userImage"] ?? "default.jpg";
      $row["serviceImage"] = $row["serviceImage"] ?? "default.jpg";
      $date = new DateTime($row["date"]);
      $row["date"] = $date->format('F d, Y g:ia');
      $date = new DateTime($row["created_at"]);
      $row["created_at"] = $date->format('F d, Y g:ia');

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

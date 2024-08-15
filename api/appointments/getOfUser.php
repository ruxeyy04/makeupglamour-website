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
  $status = isset($_GET["status"]) ? $_GET["status"] : null;
  $query = "SELECT 
              appointments.*, 
              services.service,
              services.price,
              services.image
            FROM appointments 
            INNER JOIN services 
            ON appointments.serviceid = services.id 
            WHERE appointments.userid = ?";
  if ($status) {
    $query .= " AND appointments.status = ?";
  }
    $query .=" ORDER BY FIELD(appointments.status, 'Pending', 'Accepted', 'Cancelled', 'Rejected') ASC,appointments.created_at DESC ";
  $sql = $conn->prepare($query);

  if ($status) {
    $sql->bind_param("is", $userid, $status); // Bind user id and status
  } else {
    $sql->bind_param("i", $userid); // Bind only user id
  }
  $sql->execute();
  $result = $sql->get_result();

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $date = new DateTime($row["date"]);
      $row["image"] = $row["image"] ?? "default.jpg";
      $row["date"] = $date->format('F j, Y g:i A');
      $row['price'] = number_format($row['price'],2);
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

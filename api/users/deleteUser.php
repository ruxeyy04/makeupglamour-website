<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../database.php";

$response = array();

$conn->begin_transaction();

try {
  if ($_SERVER['REQUEST_METHOD'] != "DELETE") {
    $response['message'] = "Invalid method";
    http_response_code(405);
    exit();
  }

  $rawData = file_get_contents("php://input");
  $data = parse_multipart_formdata($rawData);

  $response["data"] = $data;

  $userid = $data["userid"];

  $sql = $conn->prepare("SELECT image FROM users WHERE id = ?");
  $sql->bind_param("i", $userid);
  $sql->execute();
  $result = $sql->get_result(); 
  $row = $result->fetch_assoc();
  $oldImage = $row["image"];

  $query = "DELETE FROM users WHERE id = ?";
  $sql = $conn->prepare($query);
  $sql->bind_param("i", $userid);
  $sql->execute();

  $oldImagePath = "../../img/profiles/" . $oldImage;
  if ($oldImage != null && file_exists($oldImagePath)) {
      if ($oldImage != 'default.jpg') {
          unlink($oldImagePath);
      }
    
  }

  $conn->commit();
  $response["success"] = true;
} catch (Exception $e) {
  $conn->rollback();
  $response["error"]["catch"] = $e->getMessage();
}

$conn->close();
echo json_encode($response);

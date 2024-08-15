<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../database.php";

$response = array();

$conn->begin_transaction();

try {
  if ($_SERVER['REQUEST_METHOD'] != "PUT") {
    $response['message'] = "Invalid method";
    http_response_code(405);
    exit();
  }

  $putData = file_get_contents("php://input");
  $data = parse_multipart_formdata($putData);

  $response["data"] = $data;
  
  $serviceid = $data["serviceid"];
  $image = $data["image"];
  $service = $data["service"];
  $price = $data["price"];
  $desc = $data["desc"];
  $status = $data["status"];
    
  $sql = $conn->prepare("SELECT image FROM services WHERE id = ?");
  $sql->bind_param("i", $serviceid);
  $sql->execute();
  $result = $sql->get_result();
  $row = $result->fetch_assoc();
  $oldImage = $row["image"];

  $imageName = $oldImage;
  $imageUploaded = false;
  if ($image["name"] != null) {
    $imageUploaded = true;
    $imageName = time() . $image["name"];

    $allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    $uploadedMimeType = $data["image"]["type"];

    if (!in_array($uploadedMimeType, $allowedMimeTypes)) {
      $response["error"]["image"] = "Invalid image extension";
      echo json_encode($response);
      exit();
    }
  }

  $query = "SELECT * FROM services WHERE service = ? AND id <> ?";
  $sql = $conn->prepare($query);
  $sql->bind_param("si", $service, $serviceid);
  $sql->execute();
  $result = $sql->get_result();
  if ($result->num_rows > 0) {
    $response["error"]["email"] = "Service already exists";
  }

  foreach ($data as $key => $value) {
    if (empty($value) && $key != "password") {
      $response["error"]["empty"] = "All inputs are required";
    }
  }

  if (isset($response["error"])) {
    echo json_encode($response);
    exit();
  }

  $query = "UPDATE services SET service = ?, price = ?, description = '$desc', image = ?, status = '$status' WHERE id = ?";
  $sql = $conn->prepare($query);
  $sql->bind_param("sdsi", $service, $price, $imageName, $serviceid);
  $sql->execute();

  if ($imageUploaded) {
    $fileContentBase64 = base64_encode(file_get_contents($image["tmp_name"]));

    $uploadDirectory = "../../img/services/";
    $destination = $uploadDirectory . $imageName;

    $decodedContent = base64_decode($fileContentBase64);
    if (!file_put_contents($destination, $decodedContent)) {
      $response["error"]["image"] = "Failed to move uploaded file";
      echo json_encode($response);
      exit();
    }

    if ($oldImage != null) {
      $oldImagePath = $uploadDirectory . $oldImage;
      if (file_exists($oldImagePath)) {
        unlink($oldImagePath);
      }
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

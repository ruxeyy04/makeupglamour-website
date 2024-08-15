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

  $image = $_FILES["image"];
  $service = $_POST["service"];
  $price = $_POST["price"];
  $desc = $_POST["desc"];
  $status = $_POST["status"];

  $query = "SELECT * FROM services WHERE service = ?";
  $sql = $conn->prepare($query);
  $sql->bind_param("s", $service);
  $sql->execute();
  $result = $sql->get_result();
  if ($result->num_rows > 0) {
    $response["error"]["name"] = "Service already exists";
  }

  foreach ($_POST as $key => $value) {
    if (empty($value)) {
      $response["error"]["empty"] = "All inputs are required";
    }
  }

  if (isset($response["error"])) {
    echo json_encode($response);
    exit();
  }

  $imageName = NULL;
  $imageUploaded = false;
  if (is_uploaded_file($image["tmp_name"])) {
    $imageUploaded = true;
    $imageName = time() . $image["name"];

    $allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    $uploadedMimeType = $_FILES["image"]["type"];

    if (!in_array($uploadedMimeType, $allowedMimeTypes)) {
      $response["error"]["image"] = "Invalid image extension";
      echo json_encode($response);
      exit();
    }
  }

  $query = "INSERT INTO services (service, price, image, `description`, `status`) VALUES (?, ?, ?, '$desc', '$status')";
  $sql = $conn->prepare($query);
  $sql->bind_param("sds", $service, $price, $imageName);
  $sql->execute();

  if ($imageUploaded) {
    $targetPath = "../../img/services/" . $imageName;

    if (!move_uploaded_file($image["tmp_name"], $targetPath)) {
      $response["error"]["image"] = "Failed to move uploaded file";
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

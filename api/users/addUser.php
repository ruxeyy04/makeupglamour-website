<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../database.php";

$response = array();

$conn->begin_transaction();

try {
  $image = $_FILES["image"];
  $firstname = $_POST["firstname"];
  $lastname = $_POST["lastname"];
  $email = $_POST["email"];
  $gender = $_POST["gender"];
  $phonenumber = $_POST["phonenumber"];
  $address = $_POST["address"];
  $password = $_POST["password"];
  $usertype = $_POST["usertype"];

  $query = "SELECT * FROM users WHERE email = ?";
  $sql = $conn->prepare($query);
  $sql->bind_param("s", $email);
  $sql->execute();
  $result = $sql->get_result();
  if ($result->num_rows > 0) {
    $response["error"]["email"] = "Email already exists";
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

  $query = "INSERT INTO users (firstname, lastname, email, phonenumber, address, password, usertype, image, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  $sql = $conn->prepare($query);
  $sql->bind_param("sssssssss", $firstname, $lastname, $email, $phonenumber, $address, $password, $usertype, $imageName, $gender);
  $sql->execute();

  if ($imageUploaded) {
    $targetPath = "../../img/profiles/" . $imageName;

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

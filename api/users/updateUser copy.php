<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../database.php";

$response = array();

$conn->begin_transaction();

try {
  $putData = file_get_contents("php://input");
  $data = parse_multipart_formdata($putData);

  $userid = $data["userid"];
  $firstname = $data["firstname"];
  $lastname = $data["lastname"];
  $email = $data["email"];
  $gender = $data["gender"];
  $phonenumber = $data["phonenumber"];
  $address = $data["address"];
  $password = $data["password"];
  $usertype = $data["usertype"] ?? "Customer";
  $image = $data["image"];

  $sql = $conn->prepare("SELECT image FROM users WHERE id = ?");
  $sql->bind_param("i", $userid);
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

  $query = "SELECT * FROM users WHERE email = ? AND id <> ?";
  $sql = $conn->prepare($query);
  $sql->bind_param("si", $email, $userid);
  $sql->execute();
  $result = $sql->get_result();
  if ($result->num_rows > 0) {
    $response["error"]["email"] = "Email already exists";
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

  $query = "UPDATE users SET firstname = ?, lastname = ?, email = ?, phonenumber = ?, address = ?, password = ?, image = ?, gender = ? WHERE id = ?";
  $sql = $conn->prepare($query);
  $sql->bind_param("ssssssssi", $firstname, $lastname, $email, $phonenumber, $address, $password, $imageName, $gender, $userid);
  $sql->execute();

  if ($imageUploaded) {
    $fileContentBase64 = base64_encode(file_get_contents($image["tmp_name"]));

    $uploadDirectory = "../../img/profiles/";
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

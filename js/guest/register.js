$(document).ready(function() {
  $("#registerForm").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: url + "api/users/register",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (response) {
        if (!response.hasOwnProperty("success")) {
          for (var err in response.error) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.error[err]
            });
          }
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User registered!'
          }).then(() => {
            $("#registerForm")[0].reset();
          });
        }
      }
    });
  });
});

$(document).ready(function () {
  $("#loginForm").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: url + "api/users/login",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (response) {
        if (response.hasOwnProperty("error")) {
          for (var key in response.error) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.error[key]
            });
          }
        } else {
          Cookies.set("usertype", response.data.usertype)
          Cookies.set("id", response.data.id)

          if (response.data.usertype === "Client") {
            window.location.href = "client/index.html";
          } else if (response.data.usertype === "Incharge") {
            window.location.href = "incharge/index.html";
          } else if (response.data.usertype === "Admin") {
            window.location.href = "admin/index.html";
          }
        }
      },
    });
  });
});

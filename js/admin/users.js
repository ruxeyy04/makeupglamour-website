$(document).ready(function () {
  users = $("#users").DataTable({
    ajax: {
      url: url + "api/users/getUsers",
      data: function(d) {
        d.usertype = 'Admin'
      },
      dataSrc: "data",
      dataType: "json",
    },
    columns: [
      {
        data: null,
        render: function (data) {
          return `
            <img
              src="${url}/img/profiles/${data.image}"
              height="100"
              width="100"
              alt="" />
            ${data.firstname} ${data.lastname}
          `;
        },
      },
      {
        data: "email",
      },
      {
        data: "phonenumber",
      },
      {
        data: "gender",
      },
      {
        data: "address",
      },
      {
        data: "usertype",
      },
      {
        data: null,
        render: function (data) {
          var buttons = `
            <button
              class="btn btn-warning update"
              data-toggle="modal"
              data-userid=${data.id}
              data-firstname="${data.firstname}"
              data-lastname="${data.lastname}"
              data-email="${data.email}"
              data-password="${data.password}"
              data-phonenumber="${data.phonenumber}"
              data-gender="${data.gender}"
              data-address="${data.address}"
              data-usertype="${data.usertype}"
              data-target="#update">
              Update
            </button>
            <button
              class="btn btn-danger delete"
              data-toggle="modal"
              data-userid=${data.id}
              data-target="#delete">
              Delete
            </button>
          `;

          if (data.id == id) {
            buttons = "";
          }

          return buttons;
        },
      },
      {
        data: null,
        visible: false,
        render: function (data) {
          if (data.usertype === "Admin") return 1;
          if (data.usertype === "Secretary") return 2;
          if (data.usertype === "Doctor") return 3;
          return 4;
        },
      }
    ],
    order: [[7, "asc"]],
  });

  $("#addUser").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: url + "api/users/addUser",
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        if (response.hasOwnProperty("error")) {
          for (var err in response.error) {
            toastr.error(response.error[err]);
          }
        } else {
          toastr.success("User added");
          $("#add").modal("hide");
          $("#addUser").trigger("reset");
          users.ajax.reload();
        }
      },
    });
  });

  $(document).on("click", ".update", function () {
    var userid = $(this).attr("data-userid");
    var firstname = $(this).attr("data-firstname");
    var lastname = $(this).attr("data-lastname");
    var email = $(this).attr("data-email");
    var gender = $(this).attr("data-gender");
    var phonenumber = $(this).attr("data-phonenumber");
    var password = $(this).attr("data-password");
    var address = $(this).attr("data-address");
    var usertype = $(this).attr("data-usertype");

    $("#userid").val(userid);
    $("#firstname").val(firstname);
    $("#lastname").val(lastname);
    $("#email").val(email);
    $("#gender").val(gender);
    $("#password").val(password);
    $("#phonenumber").val(phonenumber);
    $("#address").val(address);
    $("#usertype").val(usertype);
  });

  $("#updateUserr").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: "PUT",
      url: url + "api/users/updateUser",
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        if (response.hasOwnProperty("error")) {
          for (var err in response.error) {
            toastr.error(response.error[err]);
          }
        } else {
          toastr.success("User updated");
          $("#update").modal("hide");
          users.ajax.reload();
        }
      },
    });
  });

  $(document).on("click", ".delete", function () {
    var userid = $(this).attr("data-userid");

    $("#userid2").val(userid);
  });

  $("#deleteUser").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: "DELETE",
      url: url + "api/users/deleteUser",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (response) {
        if (response.hasOwnProperty("error")) {
          for (var err in response.error) {
            toastr.error(response.error[err]);
          }
        } else {
          toastr.success("User deleted");
          $("#delete").modal("hide");
          users.ajax.reload();
        }
      },
    });
  });
});

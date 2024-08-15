$(document).ready(function () {
  getUser(id);

  appointments = $("#appointments").DataTable({
    ajax: {
      url: url + "api/appointments/getOfUser",
      data: function(d) {
        d.userid = id;
        d.status = $('#statusFilter').val(); // Add status filter to the AJAX request
      },
      dataSrc: "data",
      dataType: "json",
    },
    columns: [

      {
        data: "id",
      },
      {
        data: null,
        render: function (data) {
          return `
            <span>${data.service}</span>
          `;
        },
      },
      {
        data: "date",
      },
      
      {
        data: null,
        render: function (data) {
          return `
            ₱${data.price}
          `;
        },
      },
      {
        data: "status",
      },
      {
        data: null,
        render: function (data) {
          var buttons = `
            <button
              class="btn btn-danger btn-sm cancelBtn"
              data-toggle="modal"
              data-appointmentid=${data.id}
              data-target="#cancel">
              Cancel
            </button>
          `;

          if (data.status != "Pending") {
           
            if (data.status === "Cancelled") {
             
            }
            buttons = `
              <span class="">N/A</span>
            `
          }

          return buttons;
        },
      },

    ],
    order: [],
  });

  $("#updateUser").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    formData.append("userid", id);

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
          getUser(id);
          $("#edit").modal("hide");
        }
      },
    });
  });

  $(document).on("click", ".cancelBtn", function() {
    var appointmentid = $(this).attr("data-appointmentid");
    $("#appointmentid").val(appointmentid);
    console.log(appointmentid)
  });

  $("#cancelStatus").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: "PUT",
      url: url + "api/appointments/updateStatus",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (response) {
        if (!response.hasOwnProperty("success")) {
          for (var error in response.error) {
            toastr.error(response.error[error]);
          }
        } else {
          toastr.success("Appointment cancelled");
          appointments.ajax.reload();
          $("#cancel").modal("hide");
        }
      }
    });
  });

});
$('#statusFilter').change(function() {
  appointments.ajax.reload();
});

function getUser(userid) {
  $.ajax({
    type: "GET",
    url: url + "api/users/getOne",
    data: { userid: userid },
    dataType: "json",
    success: function (response) {
      var user = response.data;
      $(".profile").attr("src", `${url}/img/profiles/${user.image}`);
      $(".name").text(`${user.firstname} ${user.lastname}`);
      $(".gender").text(user.gender);
      $(".email").text(user.email);
      $(".address").text(user.address);
      $(".phonenumber").text(user.phonenumber);

      $(".firstname").val(user.firstname);
      $(".lastname").val(user.lastname);
      $("#gender").val(user.gender);
      $(".email").val(user.email);
      $(".address").val(user.address);
      $(".password").val(user.password);
      $(".phonenumber").val(user.phonenumber);
    },
  });
}

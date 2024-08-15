$(document).ready(function() {

  appointments = $("#appointments").DataTable({
    ajax: {
      url: url + "api/appointments/getAllAppointments",
      data: function(d) {
        d.status = $('#statusFilter').val(); // Add status filter to the AJAX request
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
              src="${url}/img/profiles/${data.userImage}"
              height="100"
              width="100"
              alt="" />
            ${data.firstname} ${data.lastname}
          `;
        },
      },
      {
        data: null,
        render: function (data) {
          return `
            <img src="${url}/img/services/${data.serviceImage}" alt="${data.service}" height="100" width="100">
            <span>${data.service}</span>
          `;
        },
      },
      {
        data: "date",
      },
      {
        data: "price",
        render: function (data) {
          return `
            ₱ ${data}
          `;
        },
      },
      {
        data: "status",
      },
      {
        data: "created_at",
      },
      {
        data: null,
        render: function (data) {
          var btn = "";
          if (data.status != "Pending") {
            btn = "disabled";
          }
          return `
            <button
              class="btn btn-warning update"
              data-toggle="modal"
              data-appointmentid=${data.id}
              data-status=${data.status}
              data-target="#update"
              ${btn}>
              Update
            </button>
          `;
        },
      },
      {
        data: null,
        visible: false,
        render: function (data) {
          if (data.status === "Pending") return 1;
          if (data.status === "Accepted") return 2;
          if (data.status === "Cancelled") return 3;
          return 4;
        },
      },
    ],
    order: [],
  });
  $('#statusFilter').change(function() {
    appointments.ajax.reload();
  });
  
  $(document).on("click", ".update", function() {
    var appointmentid = $(this).attr("data-appointmentid");
    var status = $(this).attr("data-status");

    $("#appointmentid").val(appointmentid);
    $("#status").val(status);
  });

  $("#updateAppointment").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: "PUT",
      url: url + "api/appointments/updateAppointment",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (response) {
        if (!response.hasOwnProperty("success")) {
          for (var key in response.error) {
            toastr.error(response.error[key]);
          }
        } else {
          toastr.success("Status updated");
          $("#update").modal("hide");
          appointments.ajax.reload();
        }
      }
    });
  });

});
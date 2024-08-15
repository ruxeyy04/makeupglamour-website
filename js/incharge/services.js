$(document).ready(function () {
  services = $("#services").DataTable({
    ajax: {
      url: url + "api/services/getAllServices",
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
              <img src="${url}/img/services/${data.image}" alt="${data.service}" height="100" width="100">
              <span>${data.service}</span>
            `;
        },
      },
      {
        data: "description",
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
        data: "id",
        render: function (data) {
          return `
                <button
                  class="btn btn-warning update"
                  data-serviceid=${data}
                  data-toggle="modal"
                  data-target="#update">
                  Update
                </button>
                <button
                  class="btn btn-danger delete"
                  data-serviceid=${data}
                  data-toggle="modal"
                  data-target="#delete">
                  Delete
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
  $(document).on("click", ".delete", function () {
    var serviceid = $(this).attr("data-serviceid");
    $(".serviceid").val(serviceid);
  });
  $("#deleteService").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: "DELETE",
      url: url + "api/services/deleteService",
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
          toastr.success("Service deleted");
          $("#delete").modal("hide");
          services.ajax.reload();
        }
      },
    });
  });

  $(document).on("click", ".update", function () {
    var serviceid = $(this).attr("data-serviceid");

    $.ajax({
      type: "GET",
      url: url + "api/services/getOne",
      data: { serviceid: serviceid },
      dataType: "json",
      success: function (response) {
        var data = response.data;

        $(".serviceid").val(serviceid);
        $("#service").val(data.service);
        $("#description").val(data.description);
        $("#price").val(data.price);
        $(".serv_status").val(data.status);
      },
    });
  });

  $("#updateService").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: "PUT",
      url: url + "api/services/updateService",
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
          toastr.success("Service updated");
          $("#update").modal("hide");
          services.ajax.reload();
        }
      },
    });
  });
  $("#addService").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: url + "api/services/addService",
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
          toastr.success("Service added");
          $("#add").modal("hide");
          $("#addService")[0].reset();
          services.ajax.reload();
        }
      },
    });
  });
});

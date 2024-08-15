$(document).ready(function () {
  getServices();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  $("#date").attr("min", currentDateTime);

  $("#appointmentForm").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    formData.append("userid", id);

    $.ajax({
      type: "POST",
      url: url + "api/appointments/createAppointment",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (response) {
        if (!response.hasOwnProperty("success")) {
          for (var e in response.error) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.error[e]
            });
          }
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your appointment is Pending'
          }).then(() => {
            $("#appointmentForm")[0].reset();
            $('#appointmentNow').modal('hide');
          });

        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log()
        Swal.fire({
          icon: 'error',
          title: 'Appointment Failed',
          text: jqXHR.responseJSON.message
        });
      }
    });
  });

});

function getServices() {
  $.ajax({
    type: "GET",
    url: url + "api/services/getAllServices",
    dataType: "json",
    success: function (response) {
      var html = "";
      var html2 = "";
      if (response.data.length === 0) {
        html += `
          <div class="col">
            No services available
          </div>
        `;
        html2 += `<option selected disabled>No services available</option>`;
        $("#serviceButton").prop("disabled", true);
      } else {
        for (var i = 0; i < response.data.length; i++) {
          var data = response.data[i];

          html += `
          <div class="col-md-4" data-aos="fade-up" data-aos-duration="1000">
							<div class="card">
								<img src="${url}/img/services/${data.image}" class="card-img-top" alt="..." />
								<div class="card-body">
									<h5 class="card-title">${data.service}</h5>
									<p class="card-text">
                  ${data.description}
									</p>
									<span class="${data.status == "Available" ? `text-success` : 'text-danger'}"> ${data.status}</span>
								</div>
								<div class="card-footer bg-dark">
									<div class="row d-flex align-items-center">
										<div class="col">
											<a href="#!" class="btn prim serviceid ${data.status != 'Available' ? 'service_notavailable'  : ''}" data-serv_id="${data.id}" data-toggle="modal" ${data.status == 'Available' ? 'data-target="#appointmentNow"'  : ''}>Book Now</a>
										</div>
										<div class="col text-right text-light">₱ ${data.price}</div>
									</div>
								</div>
							</div>
						</div>
          `;
        }
      }

      $("#services").html(html);
    }
  });
}
$(document).on('click', '.service_notavailable', function () {
            Swal.fire({
          icon: 'info',
          title: 'Service is not Available'
        });
})
$(document).on('click' ,'.serviceid', function () {
  let id = $(this).data('serv_id')
  $('#serv_id').val(id)
})
getUser(id)
function getUser(userid) {
  $.ajax({
    type: "GET",
    url: url + "api/users/getOne",
    data: { userid: userid },
    dataType: "json",
    success: function (response) {
      var user = response.data;
    $(".address").val(user.address);
    //   $(".profile").attr("src", `${url}/img/profiles/${user.image}`);
    //   $(".name").text(`${user.firstname} ${user.lastname}`);
    //   $(".gender").text(user.gender);
    //   $(".email").text(user.email);
    //   $(".address").text(user.address);
    //   $(".phonenumber").text(user.phonenumber);

    //   $(".firstname").val(user.firstname);
    //   $(".lastname").val(user.lastname);
    //   $("#gender").val(user.gender);
    //   $(".email").val(user.email);

    //   $(".password").val(user.password);
    //   $(".phonenumber").val(user.phonenumber);
    },
  });
}
$(document).ready(function () {
  getServices();
});

function getServices() {
  $.ajax({
    type: "GET",
    url: url + "api/services/getAllServices",
    dataType: "json",
    success: function (response) {
      var html = "";
      if (response.data.length === 0) {
        html += `
          <div class="col">
            No services available
          </div>
        `;
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
											<a href="login.html" class="btn prim">Book
												Now</a>
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
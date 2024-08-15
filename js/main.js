// URLS
const url = "https://makeupglamour-epe.logiclynxz.com/";
const currentUrl = window.location.href;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});
// COOKIES
const usertype = Cookies.get("usertype");
const id = Cookies.get("id");

// if (currentUrl.includes("patient")) {
//   if (usertype === undefined) {
//     window.location.href = '/index.html';
//   } else if (usertype === "Admin") {
//     window.location.href = "/admin/index.html";
//   } else if (usertype === "Incharge") {
//     window.location.href = "/incharge/index.html";
//   } else if (usertype === "Doctor") {
//     window.location.href = "/doctor/index.html";
//   }
// } else if (currentUrl.includes("incharge")) {
//   if (usertype === undefined) {
//     window.location.href = '/index.html';
//   } else if (usertype === "Admin") {
//     window.location.href = "/admin/index.html";
//   } else if (usertype === "Patient") {
//     window.location.href = "/patient/index.html";
//   } else if (usertype === "Doctor") {
//     window.location.href = "/doctor/index.html";
//   }
// } else if (currentUrl.includes("admin")) {
//   if (usertype === undefined) {
//     window.location.href = '/index.html';
//   } else if (usertype === "Patient") {
//     window.location.href = "/patient/index.html";
//   } else if (usertype === "Incharge") {
//     window.location.href = "/incharge/index.html";
//   } else if (usertype === "Doctor") {
//     window.location.href = "/doctor/index.html";
//   }
// } else if (currentUrl.includes("doctor")) {
//   if (usertype === undefined) {
//     window.location.href = '/';
//   } else if (usertype === "Patient") {
//     window.location.href = "patient";
//   } else if (usertype === "Incharge") {
//     window.location.href = "incharge";
//   } else if (usertype === "Admin") {
//     window.location.href = "admin";
//   }
// } 

$(document).ready(function () {
  // Logout
  $(document).on("click", "#logoutBtn", function (e) {
    e.preventDefault();
    Cookies.remove("usertype");
    Cookies.remove("id");
    window.location.href = '/index.html';
  });
});

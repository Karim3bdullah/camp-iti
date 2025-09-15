// ========== Navbar Toggle ==========
let icon = document.querySelector("#list-icon i");
let menuIcon = document.getElementById("list-icon");
let mobileNav = document.getElementById("mobileNav");

// فتح / غلق المينيو
menuIcon.addEventListener("click", function () {
  mobileNav.classList.toggle("show");

  if (mobileNav.classList.contains("show")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});





// logout
document.querySelectorAll(".logout").forEach((btn) => {
  btn.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../html/login.html";
  });
});

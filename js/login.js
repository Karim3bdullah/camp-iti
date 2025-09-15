let userEmail = document.getElementById("username");
let password = document.getElementById("password");
let btn = document.getElementById("btn");
let icon = document.querySelector("i");
let nav = document.querySelector(".virtical");
let menuIcon = document.getElementById("list-icon");
let mobileNav = document.getElementById("mobileNav");

btn.addEventListener("click", async function (e) {
  e.preventDefault();

  try {
    let response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail.value,
        password: password.value,
      }),
    });

    let data = await response.json();
    console.log(" Login success:", data);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "admin") {
      window.location.href = "../html/admin.html";
    } else {
      window.location.href = "../html/user.html";
    }

    // window.location.href = "../html/index.html";
  } catch (err) {
    console.error(err.message);
    alert("Login failed");
  }
});

// nav icon
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

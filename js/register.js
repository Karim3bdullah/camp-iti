let UsName = document.getElementById("username");
let email = document.getElementById("useremail");
let password = document.getElementById("password");
let btn = document.getElementById("btn");

btn.addEventListener("click", async function (e) {
  e.preventDefault();

  let name = UsName.value.trim();
  let mail = email.value.trim();
  let pass = password.value.trim();

  if (name === "" || pass === "" || mail === "") {
    alert("Please fill all fields");
    return;
  }

  let obj = {
    name: name,
    role: "user",
    isActive: true,
    email: mail,
    password: pass,
  };

  try {
    let response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    

    let data = await response.json();
    console.log("data:", data);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert(" Registration successful");
    window.location.href = "../html/login.html"; 
  } catch (err) {
    console.error(err.message);
    alert("Registration faild");
  }
});

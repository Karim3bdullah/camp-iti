let user = JSON.parse(localStorage.getItem("user"));
let token = localStorage.getItem("token");
let anonymous = document.querySelector(".anonymous")
let userdiv = document.querySelector(".user")
let link = userdiv.querySelector("a");

let nav = document.querySelector(".vertical")

let cards= document.querySelector(".cards")
window.onload=async function(){
  if (!user || !token) {
    // window.location.href = "../html/login.html";
    anonymous.style.display="block"
    userdiv.style.display="none"

  }
  if (user && user.role === "admin") {
  anonymous.style.display="none"
  userdiv.style.display="block"
  link.href="../html/admin.html"
}

if (user && user.role === "user") {
  anonymous.style.display="none"
  userdiv.style.display="block"
  link.href="../html/user.html"
}

let response = await fetch("http://localhost:3000/campaigns?isApproved=true")
 let campaigns = await response.json();
    console.log(" campaigns:", campaigns);
    cards.innerHTML=""
    campaigns.forEach(e => {
        console.log(e)
        let goal =Number(e.goal)
        let raised =Number(e.raised)
        let percent=  Math.min((raised/goal)*100,100)
        let card = document.createElement("div")
    card.classList.add("card")
let donateBtn = "";
if (user && token && user.role === "user") {
  if (raised >= goal) {
    
    donateBtn = `<button class="donate-btn" data-id="${e.id}" disabled>Goal Reached</button>`;
  } else {
   
    donateBtn = `<button class="donate-btn" data-id="${e.id}">Donate Now</button>`;
  }
}
       card.innerHTML=` 
        <div class="card-img">
          <img src="${e.image}" alt="">
        </div>
        <div class="card-content">
          <h3>${e.title}</h3>
          <p>${e.description}</p>
         <div class="progress-container">
          <div class="progress-bar" style="width: ${percent}%;"></div>
        </div>
          <div class="card-footer">
            <h4>$${e.raised} <span>raised of <strong>$${goal}</strong></span></h4>
            <span class="precentage">${Math.round(percent)}%</span>
            </div>
            ${donateBtn}
        </div>`



      
      cards.appendChild(card);

      if (percent === 100) {
  let progress = card.querySelector(".progress-bar");
  progress.style.backgroundColor = "#0d61cf";
}


// pladge
let donate = card.querySelector(".donate-btn");
if (donate) {
  donate.addEventListener("click", function (e) {
    e.preventDefault();
    let campaignId = e.target.getAttribute("data-id");
    localStorage.setItem("selectedCampaign", campaignId);
    window.location.href = "../html/donate.html";
  });
}
    });


}









// nav icon
menuIcon.addEventListener('click', function() {

mobileNav.classList.toggle('show');
            

if (mobileNav.classList.contains('show')) {
  icon.classList.remove('fa-bars');
  icon.classList.add('fa-times');
} else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
});

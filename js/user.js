let user = JSON.parse(localStorage.getItem("user"));

let creatorId 
let token = localStorage.getItem("token");
window.onload = function () {
  if (!user || !token) {
    window.location.href = "../html/login.html";
  }else{
    creatorId = user.id
    console.log(creatorId)
  }
   if (user.isActive === false) {
    alert("حسابك متوقف من قبل الإدارة.");
    localStorage.clear(); 
    window.location.href = "../html/index.html";
    
  }
  if (user.role === "admin") {
    window.location.href = "../html/admin.html";
  }
  // else{
  //     window.location.href="../html/admin.html"
  // }
  
};

// display campaigns from json file
let showcamp = document.getElementById("Campaigns");
let content = document.getElementById("content");
showcamp.addEventListener("click", async function loadcampaigns() {
    content.innerHTML = `
    <h2 id="welcome">My Campaigns</h2>
     <div class="cards" id="cards"></div>`;
  let res = await fetch(
    `http://localhost:3000/campaigns?creatorId=${creatorId}`
  );
  let data = await res.json();
  console.log(data);
  let cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";
  data.forEach((campaign) => {
    let card = `<div class="card">
                    <div class="image">
                        <img src="${campaign.image}"  alt="">
                    </div>
                    <div class="text">
                        <h3>${campaign.title}</h3>
                        <p class="desc">${campaign.description}</p>
                        <p class="amount">Raised: <span class="raised">$${campaign.raised} </span>raised of<span> $${campaign.goal}</span></p>
                        <p >Status: <span class="status-active">${campaign.status}</span></p>
                        <div class="actions">
                            <button id=${campaign.id} class="edit-btn">Edit</button>
                            <button id=${campaign.id} class="delete-btn">Delete</button>
                        </div>
                    </div>
                </div>`;
    cardsContainer.innerHTML += card;
  });



  // delete campaign
  let deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async function (e) {
      let campaignId = e.target.id;
      console.log("Deleting campaign with ID:", campaignId);
      try {
        let res = await fetch(`http://localhost:3000/campaigns/${campaignId}`, {
          method: "DELETE",
        });

        alert("Campaign deleted successfully");
        loadcampaigns();
      } catch (error) {
        console.error("Error deleting campaign:", error);
      }
    });
  });
  // edit campaign
  let editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      let campaignId = e.target.id;
      console.log("Editing campaign with ID:", campaignId);
      localStorage.setItem("editCampaignId", campaignId);
     
      window.location.href = "../html/campaign.html";
    });
  });
});







// display pledges from json file
let showpledges = document.getElementById("MyPledges");
showpledges.addEventListener("click", async function loadpledges() {
    content.innerHTML = 
    `<h2 id="welcome">My Pledges</h2>
      <div class="cards" id="cards"></div>
    `;
  let res = await fetch(`http://localhost:3000/pledges?userId=${creatorId}`);
  let data = await res.json();
  console.log(data);
  let cardsContainer = document.getElementById("cards");
  if (!cardsContainer) {
  console.error("Element with id='cards' not found");
  return; // يوقف الدالة بدل ما يكمل ويحصل error
}
  cardsContainer.innerHTML = "";
  data.forEach((pledge) => {
    let card = `<div class="card">
                  <div class="image">
                        <img src="${pledge.image}"  alt="">
                    </div>
                    <div class="text">
                        <h3>${pledge.campaignTitle}</h3>
                        <p class="desc">${pledge.campaignDescription}</p>
                        <p class="amount">Pledged Amount: <span class="raised">$${pledge.amount} </span></p>
                        <p >Status: <span class="status-active">${pledge.status}</span></p>
                        
                        </div>  
                        </div>`;
                        cardsContainer.innerHTML += card;
                    }
            );
 // display campaign details
 let viewbtns =document.querySelectorAll(".view-btn")
 viewbtns.forEach(function(view){
    view.addEventListener("click",function(e){
        let id = e.target.id
        console.log(id)
        localStorage.setItem("campaignId",id)
        window.location.href="../html/showcamp.html"
        
    })
 })


});



















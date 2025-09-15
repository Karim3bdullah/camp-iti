
window.onload=function(){
    let user=JSON.parse(localStorage.getItem("user"))
   let token = localStorage.getItem("token");
    if(!token || !user){
      window.location.href="../html/login.html"
    }
    if(user.role!=="admin"){
        window.location.href="../html/user.html"
    }
    

let logout =document.querySelector("#logout")
logout.addEventListener("click",function(){
  
  localStorage.clear()
  window.location.href = "../html/login.html"
})




// users display 
let users=document.querySelector("#User")
let content =document.querySelector("#content")
let tbody= document.querySelector("#tbody")
let thead= document.querySelector("#thead")
let title= document.querySelector("#title")
users.addEventListener("click",async function loadusers(){
  tbody.innerHTML=""
  let headers =`<thead >
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </thead>`
  let response =await fetch("http://localhost:3000/users")
  let data=await response.json()
  console.log(data)
  title.textContent=users.textContent
  data.forEach(ele => {
    let statusText = ele.isActive ? "Active" : "Banned";
  let statusClass = ele.isActive ? "status-active" : "status-banned";
  let buttonText = ele.isActive ? "Ban" : "Unban";
  let buttonClass = ele.isActive ? "btn-ban" : "btn-unban";
  let roleBtn = "";
  if (ele.id !== 2) { 
    let roleText = ele.role === "admin" ? "Revoke Admin" : "Make Admin";
    let roleClass = ele.role === "admin" ? "btn-revoke" : "btn-make";
    roleBtn = `<button id="${ele.id}" class="${roleClass}">${roleText}</button>`;
  }
    let row=` 
        
        <tr>
            <td>${ele.name}</td>
            <td>${ele.email}</td>
            <td><span class="${statusClass}">${statusText}</span></td>
            <td><button id="${ele.id}" class="${buttonClass}">${buttonText}</button> 
            ${roleBtn}</td>
          </tr>
         
    `


         
          tbody.innerHTML += row
  });
   thead.innerHTML =headers
content.style.display = 'block';
// ban unban users
let banbuttons = document.querySelectorAll(".btn-ban, .btn-unban");
banbuttons.forEach(function(btn){
  btn.addEventListener("click",async function(e){
    let id =e.target.id
    console.log(id)
      let userRes = await fetch(`http://localhost:3000/users/${id}`);
      let userData = await userRes.json();
       let newStatus = !userData.isActive;
      
       console.log(newStatus)
       
    await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });

     if (newStatus) {
  e.target.textContent = "Ban";
  e.target.className = "btn-ban";
   e.target.closest("tr").querySelector("span").textContent = "Active";
  e.target.closest("tr").querySelector("span").className = "status-active";
} else {
  e.target.textContent = "Unban";
  e.target.className = "btn-unban";
  e.target.closest("tr").querySelector("span").textContent = "Banned";
  e.target.closest("tr").querySelector("span").className = "status-banned";
}


  })
})

// make admin or user
let roleButtons = document.querySelectorAll(".btn-make, .btn-revoke");
roleButtons.forEach(function(btn){
  btn.addEventListener("click",async function(e){
    let id =e.target.id
    console.log(id)
      let userRes = await fetch(`http://localhost:3000/users/${id}`);
      let userData = await userRes.json();
       let newRole = userData.role==="admin"? "user" : "admin";
      
    await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (newRole === "admin") {
  e.target.textContent = "Revoke Admin";
  e.target.className = "btn-revoke";
} else {
  e.target.textContent = "Make Admin";
  e.target.className = "btn-make";
}
  }

      );

})
})





// campaigns display
let campaigns=document.querySelector("#campaigns")
campaigns.addEventListener("click",async function loadcampaigns(){
  tbody.innerHTML=""
  let headers =`<thead>
          <th>Title</th>
          <th>Author</th>
          <th>Status</th>
          <th>Actions</th>
        </thead>`
  title.textContent=campaigns.textContent
  let response =await fetch("http://localhost:3000/campaigns")
  let data=await response.json()
  console.log(data)
  
  data.forEach(ele => {
    if(ele.status==="Pending"){
      statusText="pending"
      statusClass="status-pending"
      buttonText="Approve"
      buttonClass="btn-unban"
    } else if(ele.status==="approved"){
      statusText="approved"
      statusClass="status-active"
      buttonText="Reject"
      buttonClass="btn-ban"
    } else{
      statusText="rejected"
      statusClass="status-banned"
      buttonText="Approve"
      buttonClass="btn-unban"
      }


    let row=`  
        <tbody>
          <tr>
            <td>${ele.title}</td>
            <td>${ele.creatorName}</td>
            <td><span class=${statusClass}>${statusText}</span></td>
            <td><button id=${ele.id} class=${buttonClass}>${buttonText}</button></td>
          </tr>
        
        </tbody>`
          
          tbody.innerHTML += row
  });
    thead.innerHTML =headers
content.style.display = 'block';
  
let banbuttons = document.querySelectorAll(".btn-ban, .btn-unban");

banbuttons.forEach(function(btn){
  btn.addEventListener("click",async function(e){
    let id =e.target.id
    let currentAction = e.target.textContent;
  let newStatus
  let newIsApproved
      if (currentAction === "Approve") {
        newStatus = "approved";
        newIsApproved = true;
      } else {
        newStatus = "rejected";
        newIsApproved = false;
      }
       
    await fetch(`http://localhost:3000/campaigns/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, isApproved: newIsApproved }),  

      });
      
     if (newStatus === "approved") {
        e.target.textContent = "Reject";
        e.target.className = "btn-ban";
        e.target.closest("tr").querySelector("span").textContent = "Approved";
        e.target.closest("tr").querySelector("span").className = "status-active";
      } else {
        e.target.textContent = "Approve";
        e.target.className = "btn-unban";
        e.target.closest("tr").querySelector("span").textContent = "Rejected";
        e.target.closest("tr").querySelector("span").className = "status-banned";
      }
});

})
})
}





// dispaly pladges
let pledges=document.querySelector("#Pledges")
pledges.addEventListener("click",async function loadpledges(){
  tbody.innerHTML=""
  let headers =`<thead >
          <th>Campaign Title</th>
          <th>User Name</th>
          <th>Amount</th>   
        </thead>`
  let response =await fetch("http://localhost:3000/pledges")
  let data=await response.json()
  console.log(data)
  // let totalAmount = data.reduce((sum, pledge) => sum + Number(pledge.amount), 0);
  // console.log("Total Pledges: $", totalAmount);
  title.textContent=pledges.textContent
  data.forEach(ele => {
    let row=`
        
          <tr>
            <td>${ele.campaignTitle}</td>
            <td>${ele.userName}</td>
            <td>$${ele.amount}</td> 
          </tr>`
          tbody.innerHTML += row
  });
   thead.innerHTML =headers
content.style.display = 'block';
});











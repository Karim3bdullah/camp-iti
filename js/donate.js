

let user = JSON.parse(localStorage.getItem("user"));
let campaignId = localStorage.getItem("selectedCampaign");
let token = localStorage.getItem("token");

window.onload = function () {
  if (!user || !token) {
    window.location.href = "../html/login.html";
  }

  let donateForm = document.getElementById("pledgeForm");

  if (donateForm) {
    donateForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      let amount = document.getElementById("amount").value;
      let name = document.getElementById("name").value;
      let card = document.getElementById("card").value;
      let expiry = document.getElementById("expiry").value;
      let cvc = document.getElementById("cvc").value;

      try {
        let campaign = await fetch(`http://localhost:3000/campaigns/${campaignId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        let details = await campaign.json();
        

        let donation = {
          campaignTitle: details.title,
          campaignDescription: details.description,
          image: details.image,
          userId: user.id,
          userName: user.name,
          campaignId: Number(campaignId),
          amount:Number (amount),
          cardholder: name,
          cardNumber: card,
          cvc: cvc,
          status: "Ongoing",
        };

        let response = await fetch("http://localhost:3000/pledges", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(donation),
        });

          let newRaised = Number(details.raised) + Number(amount);

  await fetch(`http://localhost:3000/campaigns/${campaignId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ raised: newRaised }),
  });

        localStorage.removeItem("selectedCampaign");
        window.location.href = "../html/index.html";
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to process donation. Please try again.");
      }
    });
  }
};

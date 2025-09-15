let user = JSON.parse(localStorage.getItem("user"));
let token = localStorage.getItem("token");

window.onload = async function () {
  if (!user || !token) {
    window.location.href = "../html/login.html";
    return;
  }
  if (user.role === "admin") {
    window.location.href = "../html/admin.html";
    return;
  }

  let head = document.querySelector("#hchanging");
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let goal = document.getElementById("goal");
  let image = document.getElementById("Image");
  let preview = document.getElementById("preview");
  let category = document.getElementById("category");
  let createbtn = document.querySelector(".create-btn");
  let camp = localStorage.getItem("editCampaignId");

    // edit campaign
  if (camp) {
    head.innerHTML = "Edit your campaign";
    createbtn.textContent = "Edit Campaign";

    let oldImage = "";
    try {
      let res = await fetch(`http://localhost:3000/campaigns/${camp}`);
      let data = await res.json();
      console.log(data);

      title.value = data.title;
      description.value = data.description;
      goal.value = data.goal;
      category.value = data.category;
      preview.src = data.image;
      oldImage = data.image;
    } catch (error) {
      console.log("Error fetching campaign data:", error);
    }

    createbtn.addEventListener("click", async function (e) {
      e.preventDefault();
      if (
        !title.value.trim() ||
        !description.value.trim() ||
        !goal.value.trim() ||
        !category.value.trim()
      ) {
        alert(" Please fill in all fields before continuing.");
        return;
      }

      let Imageurl = image.files.length > 0
        ? await toBase64(image.files[0]) // صورة جديدة
        : oldImage; // الصورة القديمة

      let updatedObject = {
        title: title.value,
        image: Imageurl,
        description: description.value,
        category: category.value,
        creatorName: user.name,
        creatorId: user.id,
        goal: Number(goal.value),
        status: "Pending",
         isApproved: false
      };

      try {
        await fetch(`http://localhost:3000/campaigns/${camp}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedObject)
        });
        alert("Campaign updated successfully");
        localStorage.removeItem("editCampaignId");
        window.location.href = "../html/user.html";
      } catch (err) {
        console.log(err);
      }
    });
  }

  // create campaign
  else {
    head.textContent = "Create a Campaign";
    createbtn.textContent = "Create Campaign";

    createbtn.addEventListener("click", async function (e) {
      e.preventDefault();
      if (
        !title.value.trim() ||
        !description.value.trim() ||
        !goal.value.trim() ||
        !image.files.length ||
        !category.value.trim()
      ) {
        alert(" Please fill in all fields before continuing.");
        return;
      }

      let Imageurl = await toBase64(image.files[0]);

      let object = {
        title: title.value,
        image: Imageurl,
        description: description.value,
        category: category.value,
        creatorName: user.name,
        creatorId: user.id,
        goal: Number(goal.value),
        raised: 0,
        status: "Pending",
        isApproved: false
      };

      try {
        await fetch("http://localhost:3000/campaigns", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(object)
        });
      } catch (err) {
        console.log(err);
      }

      document.querySelector("form").reset();
      preview.src = "";
      alert("Campaign created successfully");
    });
  }

  // ---- Preview when selecting new image ----
  image.addEventListener("change", function () {
    if (image.files && image.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(image.files[0]);
    }
  });

  // ---- Image converter ----
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
};

// ============= modal =============
const addemployeeBtn = document.getElementById("add-employee");
const modal = document.getElementById("employee-modal");
const closeModalBtn = document.getElementById("close-modal");

// open modale
addemployeeBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// hide modal function
const closeModal = () => modal.classList.add("hidden");

// close modal
closeModalBtn.addEventListener("click", () => {
  closeModal();
});

// hide modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// ============= photo preview =============
const photoUrl = document.getElementById("photo-url");
const photoPreview = document.getElementById("photo-preview");

photoUrl.addEventListener("input", () => {
  const url = photoUrl.value.trim();

  if (url === "") {
    photoPreview.src = "./assets/img/profile-photo.jpg";
  } else {
    photoPreview.src = url;
  }
});

// ============= add new experience =============
const addExperienceBtn = document.getElementById("add-experience-btn");
const experience = document.getElementById("experience-container");

addExperienceBtn.addEventListener("click", () => {
  //firstElementChild for select one element if they are multiple
  const clone = experience.firstElementChild.cloneNode(true);
  experience.appendChild(clone);
});

// ============= submit values =============
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  //non refresh page
  e.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const role = document.getElementById("role").value;
  const photo = document.getElementById("photo-url").value.trim();

  // REGEX validation
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\s\-]{8,15}$/;
  const urlRegex = /^https?:\/\/.+/;

  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    alert("please enter a valid first and last name");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("please enter a valid email");
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert("please enter a valid phonenumber");
    return;
  }

  if (role === "Select a role") {
    alert("please select a role");
    return;
  }

  if (photo !== "" && !urlRegex.test(photo)) {
    alert("please enter a valid photo URL");
    return;
  }

  // experience
  const experiences = [];
  const divs = experience.querySelectorAll("#experience-modal");

  divs.forEach((div) => {
    const company = div.querySelector("[data-company]").value;
    const roleExp = div.querySelector("[data-roleExp]").value;
    const from = div.querySelector("[data-from]").value;
    const to = div.querySelector("[data-to]").value;
    const desc = div.querySelector("[data-desc]").value;

    if (from && to && new Date(from) > new Date(to)) {
      alert("the start date must be before end date");
      return;
    }

    // push only if not empty
    if (company || desc || from || to) {
      experiences.push({ company, roleExp, from, to, desc });
    }
  });

  // employee object
  const employee = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    phone,
    role,
    photo: photo || "./assets/img/profile-photo.jpg",
    experiences,
    zone: null,
    assigned: false,
  };

  // save to local storage
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  //test add employee
  console.log(employee);

  
  form.reset();
  photoPreview.src = "./assets/img/profile-photo.jpg";

  // remove duplicate experiences holder
  while (experience.children.length > 1) {
    experience.lastElementChild.remove();
  }

  closeModal();

  // apply it here to show new employee add without reloading page
  renderEmployees();
});

// ============= render employees from localStorage =============
const employeeList = document.getElementById("employee-list");

const renderEmployees = () => {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  employeeList.innerHTML = ""; 

  employees.forEach(e => {
    const card = document.createElement("div");
    card.className =
      "flex justify-between items-center bg-gray-100 rounded-[5px] p-2 mb-2";
    card.dataset.id = e.id;

    card.innerHTML = `
      <div class="w-10 h-10">
        <img class="w-full h-full object-cover rounded-full"
             src="${e.photo}"
             alt="profile">
      </div>
      <div class="flex-col text-center">
        <h3 class="font-bold">${e.firstName} ${e.lastName}</h3>
        <p>${e.role}</p>
      </div>
      <button><i class="fa-solid fa-user-minus cursor-pointer"></i></button>
    `;

    employeeList.appendChild(card);
  });
};

renderEmployees();
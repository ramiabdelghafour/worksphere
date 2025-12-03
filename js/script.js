// ============= modal =============
const addemployeeBtn = document.getElementById("add-employee");
const modal = document.getElementById("employee-modal");
const closeModalBtn = document.getElementById("close-modal");

// open modale
addemployeeBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// close modal from backgournd
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
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

  if (!urlRegex.test(photo)) {
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

  // remove duplicate experiences holder
  while (experience.children.length > 1) {
    experience.lastElementChild.remove();
  }

  modal.classList.add("hidden");

  // apply it here to show new employee add without reloading page
  renderEmployees();
});

// ============= add employees to localStorage =============
let ExistingEmployees = [
  {
    id: Date.now() + 1,
    firstName: "Youssef",
    lastName: "Sabiri",
    email: "youssef.sabiri@example.com",
    phone: "0612345678",
    role: "IT Technician",
    photo: "https://avatar.iran.liara.run/public",
    experiences: [],
    zone: null,
    assigned: false,
  },
  {
    id: Date.now() + 2,
    firstName: "Sami",
    lastName: "Rguibi",
    email: "khadija.rguibi@example.com",
    phone: "0678123456",
    role: "Receptionist",
    photo: "https://avatar.iran.liara.run/public",
    experiences: [],
    zone: null,
    assigned: false,
  },
  {
    id: Date.now() + 3,
    firstName: "Mohammed",
    lastName: "Alaoui",
    email: "mohammed.alaoui@example.com",
    phone: "0654321987",
    role: "Security Guard",
    photo: "https://avatar.iran.liara.run/public",
    experiences: [],
    zone: null,
    assigned: false,
  },
  {
    id: Date.now() + 4,
    firstName: "Salma",
    lastName: "Farsi",
    email: "salma.farsi@example.com",
    phone: "0667788990",
    role: "Manager",
    photo: "https://avatar.iran.liara.run/public",
    experiences: [],
    zone: null,
    assigned: false,
  },
  {
    id: Date.now() + 5,
    firstName: "Houssam",
    lastName: "Arkhis",
    email: "houssam.arkhis@example.com",
    phone: "0622334455",
    role: "Cleaner",
    photo: "https://avatar.iran.liara.run/public",
    experiences: [],
    zone: null,
    assigned: false,
  },
  {
    id: Date.now() + 6,
    firstName: "Fatima",
    lastName: "Lbyad",
    email: "houssam.arkhis@example.com",
    phone: "0622334455",
    role: "Cleaner",
    photo: "https://avatar.iran.liara.run/public",
    experiences: [],
    zone: null,
    assigned: false,
  },
  {
    id: Date.now() + 7,
    firstName: "Fouzia",
    lastName: "Fawzi",
    email: "houssam.arkhis@example.com",
    phone: "0622334455",
    role: "Other",
    photo: "https://avatar.iran.liara.run/public",
    experiences: [],
    zone: null,
    assigned: false,
  },
  {
    id: Date.now() + 8,
    firstName: "Amine",
    lastName: "Ali",
    email: "youssef.sabiri@example.com",
    phone: "0612345678",
    role: "IT Technician",
    photo: "https://avatar.iran.liara.run/public",
    experiences: [],
    zone: null,
    assigned: false,
  },
  {
    id: Date.now() + 9,
    firstName: "Ali",
    lastName: "Med",
    email: "mohammed.alaoui@example.com",
    phone: "0654321987",
    role: "Security Guard",
    photo: "https://avatar.iran.liara.run/public",
    experiences: [],
    zone: null,
    assigned: false,
  },
];

localStorage.setItem("employees", JSON.stringify(ExistingEmployees));

// ============= render employees from localStorage to list aside =============
const employeeList = document.getElementById("employee-list");

const renderEmployees = () => {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  employeeList.innerHTML = "";

  employees.forEach((e) => {
    if (e.assigned === false) {
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
    }
  });
};
renderEmployees();

// ============= employee list modal: add employers to a room =============
const roomModal = document.getElementById("room-modal");
const roomCloseBtn = document.getElementById("close-room-modal");
const roomList = document.getElementById("room-list");

// close modal (X)
roomCloseBtn.addEventListener("click", () => {
  roomModal.classList.add("hidden");
});

// close modal from backgournd
roomModal.addEventListener("click", (e) => {
  if (e.target === roomModal) {
    roomModal.classList.add("hidden");
  }
});

// ============= render conference room =============
const conferenceContainer = document.getElementById("conference-employees");

function renderConference() {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  conferenceContainer.innerHTML = "";

  const inConference = employees.filter((e) => e.zone === "conference");

  inConference.forEach((e) => {
    const card = document.createElement("div");
    card.className =
      "w-40 h-10 rounded-[5px] bg-gray-100 text-[10px] text-black shadow flex justify-between items-center p-3";

    card.innerHTML = `
      <div class="w-8 h-8">
        <img class="w-full h-full object-cover rounded-full"
            src="${e.photo}" alt="profile">
      </div>
      <div>
        <p class="font-bold text-sm">${e.firstName}</p>
        <p class="text-sm">${e.role}</p>
      </div>
      <button data-id="${e.id}">
        <i class="fa-solid fa-x cursor-pointer text-red-600 text-[14px]"></i>
      </button>
    `;

    // unassign from conference
    card.querySelector("button").addEventListener("click", () => {
      unassignEmployee(e.id);
    });

    conferenceContainer.appendChild(card);
  });
}

//unsign function
function unassignEmployee(id) {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return;

  //store to oldzone before turning the zone to null
  const oldZone = employees[index].zone;

  employees[index].assigned = false;
  employees[index].zone = null;

  localStorage.setItem("employees", JSON.stringify(employees));

  renderEmployees();

  if (oldZone === "server") renderServer();
  if (oldZone === "security") renderSecurity();
  if (oldZone === "reception") renderReception();
  if (oldZone === "conference") renderConference();
  if (oldZone === "staff") renderStaff();
  if (oldZone === "archive") renderArchive();
}

// assign fucntion for all rooms
function assignEmployee(id, zone) {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return; // employee not found

  employees[index].assigned = true;
  employees[index].zone = zone;

  localStorage.setItem("employees", JSON.stringify(employees));

  renderEmployees();
  if (zone === "server") renderServer();
  if (zone === "security") renderSecurity();
  if (zone === "reception") renderReception();
  if (zone === "conference") renderConference();
  if (zone === "staff") renderStaff();
  if (zone === "archive") renderArchive();

  roomModal.classList.add("hidden");
}

// ============= conference selection list modal =============
const conferenceAddBtn = document.getElementById("addBtn-conference");

// add employee to conference room
conferenceAddBtn.addEventListener("click", () => {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  const validRole = ["Manager", "Cleaner", "Other"];
  const available = employees.filter(
    (e) => validRole.includes(e.role) && !e.assigned
  );

  // conference limite employee check
  const setInRoom = employees.filter((e) => e.zone === "conference").length;
  if (setInRoom >= 4) {
    alert("Room is full");
    return;
  }

  // fill the modal list
  roomList.innerHTML = "";

  available.forEach((e) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between bg-gray-100 rounded-lg p-2 text-[11px]";

    div.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-8 h-8">
          <img class="w-full h-full object-cover rounded-full"
              src="${e.photo}" alt="profile">
        </div>
        <div>
          <p class="font-bold text-xs">${e.firstName} ${e.lastName}</p>
          <p class="text-[10px] text-gray-600">${e.role}</p>
        </div>
      </div>
      <button class="bg-green-500 hover:bg-green-600 text-white text-[10px] px-2 py-1 rounded"
              data-id="${e.id}">
        Add
      </button>
    `;

    // when clicking add
    div.querySelector("button").addEventListener("click", () => {
      assignEmployee(e.id, "conference");
    });

    roomList.appendChild(div);
  });

  roomModal.classList.remove("hidden");
});



// ============= render server room =============
const serverContainer = document.getElementById("server-employees");

function renderServer() {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  serverContainer.innerHTML = "";

  const inServer = employees.filter((e) => e.zone === "server");

  inServer.forEach((e) => {
    const card = document.createElement("div");
    card.className =
      "w-40 h-10 rounded-[5px] bg-gray-100 text-[10px] text-black shadow flex justify-between items-center p-3";

    card.innerHTML = `
      <div class="w-8 h-8">
        <img class="w-full h-full object-cover rounded-full"
            src="${e.photo}" alt="profile">
      </div>
      <div>
        <p class="font-bold text-sm">${e.firstName}</p>
        <p class="text-sm">${e.role}</p>
      </div>
      <button data-id="${e.id}">
        <i class="fa-solid fa-x cursor-pointer text-red-600 text-[14px]"></i>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      unassignEmployee(e.id);
    });

    serverContainer.appendChild(card);
  });
}


// ============= server selection list modal =============
const serverAddBtn = document.getElementById("addBtn-server");

// add employee to server room
serverAddBtn.addEventListener("click", () => {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  const validRole = ["Manager", "IT Technician"];
  const available = employees.filter(
    (e) => validRole.includes(e.role) && !e.assigned
  );

  const setInRoom = employees.filter((e) => e.zone === "server").length;
  if (setInRoom >= 2) {
    alert("Room is full");
    return;
  }

  roomList.innerHTML = "";

  available.forEach((e) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between bg-gray-100 rounded-lg p-2 text-[11px]";

    div.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-8 h-8">
          <img class="w-full h-full object-cover rounded-full"
              src="${e.photo}" alt="profile">
        </div>
        <div>
          <p class="font-bold text-xs">${e.firstName} ${e.lastName}</p>
          <p class="text-[10px] text-gray-600">${e.role}</p>
        </div>
      </div>
      <button class="bg-green-500 hover:bg-green-600 text-white text-[10px] px-2 py-1 rounded"
              data-id="${e.id}">
        Add
      </button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      assignEmployee(e.id, "server");
    });

    roomList.appendChild(div);
  });

  roomModal.classList.remove("hidden");
});


// ============= render security room =============
const securityContainer = document.getElementById("security-employees");

function renderSecurity() {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  securityContainer.innerHTML = "";

  const inSercurity = employees.filter((e) => e.zone === "security");

  inSercurity.forEach((e) => {
    const card = document.createElement("div");
    card.className =
      "w-40 h-10 rounded-[5px] bg-gray-100 text-[10px] text-black shadow flex justify-between items-center p-3";

    card.innerHTML = `
      <div class="w-8 h-8">
        <img class="w-full h-full object-cover rounded-full"
            src="${e.photo}" alt="profile">
      </div>
      <div>
        <p class="font-bold text-sm">${e.firstName}</p>
        <p class="text-sm">${e.role}</p>
      </div>
      <button data-id="${e.id}">
        <i class="fa-solid fa-x cursor-pointer text-red-600 text-[14px]"></i>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      unassignEmployee(e.id);
    });

    securityContainer.appendChild(card);
  });
}


// ============= securtiy selection list modal =============
const securityAddBtn = document.getElementById("addBtn-security");

securityAddBtn.addEventListener("click", () => {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  const validRole = ["Manager", "Security Guard"];
  const available = employees.filter(
    (e) => validRole.includes(e.role) && !e.assigned
  );

  const setInRoom = employees.filter((e) => e.zone === "security").length;
  if (setInRoom >= 2) {
    alert("Room is full");
    return;
  }

  roomList.innerHTML = "";

  available.forEach((e) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between bg-gray-100 rounded-lg p-2 text-[11px]";

    div.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-8 h-8">
          <img class="w-full h-full object-cover rounded-full"
              src="${e.photo}" alt="profile">
        </div>
        <div>
          <p class="font-bold text-xs">${e.firstName} ${e.lastName}</p>
          <p class="text-[10px] text-gray-600">${e.role}</p>
        </div>
      </div>
      <button class="bg-green-500 hover:bg-green-600 text-white text-[10px] px-2 py-1 rounded"
              data-id="${e.id}">
        Add
      </button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      assignEmployee(e.id, "security");
    });

    roomList.appendChild(div);
  });

  roomModal.classList.remove("hidden");
});



// ============= render archive room =============
const archiveContainer = document.getElementById("archive-employees");

function renderArchive() {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  archiveContainer.innerHTML = "";

  const inArchive = employees.filter((e) => e.zone === "archive");

  inArchive.forEach((e) => {
    const card = document.createElement("div");
    card.className =
      "w-40 h-10 rounded-[5px] bg-gray-100 text-[10px] text-black shadow flex justify-between items-center p-3";

    card.innerHTML = `
      <div class="w-8 h-8">
        <img class="w-full h-full object-cover rounded-full"
            src="${e.photo}" alt="profile">
      </div>
      <div>
        <p class="font-bold text-sm">${e.firstName}</p>
        <p class="text-sm">${e.role}</p>
      </div>
      <button data-id="${e.id}">
        <i class="fa-solid fa-x cursor-pointer text-red-600 text-[14px]"></i>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      unassignEmployee(e.id);
    });

    archiveContainer.appendChild(card);
  });
}


// ============= archive selection list modal =============
const archiveAddBtn = document.getElementById("addBtn-archive");

archiveAddBtn.addEventListener("click", () => {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  const validRole = ["Manager", "Security Guard", "IT Technician"];
  const available = employees.filter(
    (e) => validRole.includes(e.role) && !e.assigned
  );

  const setInRoom = employees.filter((e) => e.zone === "archive").length;
  if (setInRoom >= 2) {
    alert("Room is full");
    return;
  }

  roomList.innerHTML = "";

  available.forEach((e) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between bg-gray-100 rounded-lg p-2 text-[11px]";

    div.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-8 h-8">
          <img class="w-full h-full object-cover rounded-full"
              src="${e.photo}" alt="profile">
        </div>
        <div>
          <p class="font-bold text-xs">${e.firstName} ${e.lastName}</p>
          <p class="text-[10px] text-gray-600">${e.role}</p>
        </div>
      </div>
      <button class="bg-green-500 hover:bg-green-600 text-white text-[10px] px-2 py-1 rounded"
              data-id="${e.id}">
        Add
      </button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      assignEmployee(e.id, "archive");
    });

    roomList.appendChild(div);
  });

  roomModal.classList.remove("hidden");
});

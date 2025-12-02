// ============= modal =============
const addWorkerBtn = document.getElementById("addWorker");
const modal = document.getElementById("employee-modal");
const closeModalBtn = document.getElementById("close-modal");

// open modale
addWorkerBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// hide modal
modal.addEventListener("click", e => {
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
    photoPreview.src = "./assets/img/profile-photo.jpg"; // default
  } else {
    photoPreview.src = url;
  }
});


// ============= add new experience =============
const addExperienceBtn = document.getElementById('add-experience-btn');
const experience = document.getElementById('experience-container');

addExperienceBtn.addEventListener('click', () => {
  //firstElementChild for select one element if they are multiple
    const clone = experience.firstElementChild.cloneNode(true);
    experience.appendChild(clone);
});

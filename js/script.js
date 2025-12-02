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


// ============= add new experience =============
const addExperienceBtn = document.getElementById('add-experience-btn');
const experience = document.getElementById('experience-container');

addExperienceBtn.addEventListener('click', () => {
    const clone = experience.cloneNode(true);
    experience.appendChild(clone);
});

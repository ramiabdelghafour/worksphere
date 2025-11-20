// modal
const addWorkerBtn = document.getElementById("addWorker");
const modal = document.getElementById("employee-modal");
const closeModalBtn = document.getElementById("close-modal");

// open modal
addWorkerBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
});

// hide the modale
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
});

// Conference Room: add static worker on "+"
const addBtnConference = document.getElementById("addBtn-conference");
const conferenceWorkers = document.getElementById("conference-workers");

let confCounter = 1;

addBtnConference.addEventListener("click", () => {
  const worker = document.createElement("div");

  worker.className =
    "w-10 h-10 rounded-f[5px] bg-blue-600/80 text-[10px] text-white shadow";

  worker.textContent = "Worker " + confCounter;
  confCounter++;

  conferenceWorkers.appendChild(worker);
});

// modal
  const addWorkerBtn   = document.getElementById('addWorker');
  const modal          = document.getElementById('employee-modal');
  const closeModalBtn  = document.getElementById('close-modal');

// open modal
  addWorkerBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');

  });

// close modal
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });

// hide the modale
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  });


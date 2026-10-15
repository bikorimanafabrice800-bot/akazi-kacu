
const jobForm = document.querySelector("#jobForm");
const formMessage = document.querySelector("#formMessage");
const jobsList = document.querySelector("#jobsList");
const searchButton = document.querySelector("#searchButton");
const searchMessage = document.querySelector("#searchMessage");

const jobs = [];

// Kwongeramo itangazo rishya
jobForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const job = {
    title: document.querySelector("#jobTitle").value.trim(),
    company: document.querySelector("#company").value.trim(),
    location: document.querySelector("#jobLocation").value,
    type: document.querySelector("#jobType").value,
    description: document.querySelector("#jobDescription").value.trim(),
    contact: document.querySelector("#contact").value.trim()
  };

  if (
    !job.title ||
    !job.company ||
    !job.location ||
    !job.type ||
    !job.description ||
    !job.contact
  ) {
    showMessage(formMessage, "Uzuza ibisabwa byose.", "error");
    return;
  }

  jobs.push(job);

  displayJobs(jobs);

  showMessage(
    formMessage,
    "Document was received. Itangazo ryakiriwe neza!",
    "success"
  );

  jobForm.reset();
});

// Kwerekana amatangazo y'akazi
function displayJobs(jobArray) {
  jobsList.replaceChildren();

  if (jobArray.length === 0) {
    const message = document.createElement("p");
    message.textContent = "Nta kazi kabonetse.";
    jobsList.appendChild(message);
    return;
  }

  jobArray.forEach(function (job) {
    const card = document.createElement("article");
    card.className = "job-card";

    const title = document.createElement("h3");
    title.textContent = job.title;

    const company = document.createElement("p");
    company.textContent = "Ikigo: " + job.company;

    const location = document.createElement("p");
    location.textContent = "Aho kari: " + job.location;

    const type = document.createElement("p");
    type.textContent = "Ubwoko: " + job.type;

    const description = document.createElement("p");
    description.textContent = job.description;

    const contact = document.createElement("p");
    contact.textContent = "Email cyangwa telefoni: " + job.contact;

    card.append(title, company, location, type, description, contact);
    jobsList.appendChild(card);
  });
}

// Gushakisha hakurikijwe aho akazi kari n'ubwoko
searchButton.addEventListener("click", function () {
  const location = document.querySelector("#searchLocation").value;
  const type = document.querySelector("#searchType").value;

  const filteredJobs = jobs.filter(function (job) {
    const locationMatches = !location || job.location === location;
    const typeMatches = !type || job.type === type;

    return locationMatches && typeMatches;
  });

  displayJobs(filteredJobs);

  showMessage(
    searchMessage,
    filteredJobs.length > 0
      ? "Habonetse amatangazo " + filteredJobs.length + "."
      : "Nta kazi kabonetse. Gerageza guhindura ibyo wahisemo.",
    filteredJobs.length > 0 ? "success" : "error"
  );
});

// Kwerekana ubutumwa
function showMessage(element, message, className) {
  element.textContent = message;
  element.className = className;
}

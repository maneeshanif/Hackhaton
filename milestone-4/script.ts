const form = document.querySelector("#resume-form") as HTMLFormElement;
const mainContainer = document.querySelector(".main") as HTMLElement;
const educationSection = document.querySelector("#education-section") as HTMLElement;
const skillsSection = document.querySelector("#skills-section") as HTMLElement;
const experienceSection = document.querySelector("#experience-section") as HTMLElement;

// Adding dynamic education fields
document.querySelector("#add-education")?.addEventListener("click", () => {
  const newEducation = document.createElement("div");
  newEducation.classList.add("education-item");
  newEducation.innerHTML = `
    <label for="degree">Degree:</label>
    <input type="text" class="degree" required />
    <label for="institution">Institution:</label>
    <input type="text" class="institution" required />
    <label for="years">Years:</label>
    <input type="text" class="years" required />
  `;
  educationSection.appendChild(newEducation);
});

// Adding dynamic skill fields
document.querySelector("#add-skill")?.addEventListener("click", () => {
  const newSkill = document.createElement("div");
  newSkill.classList.add("skill-item");
  newSkill.innerHTML = `
    <label for="skill">Skill:</label>
    <input type="text" class="skill" required />
    <label for="skill-percentage">Skill Percentage:</label>
    <input type="number" class="skill-percentage" required />
  `;
  skillsSection.appendChild(newSkill);
});

// Adding dynamic experience fields
document.querySelector("#add-experience")?.addEventListener("click", () => {
  const newExperienceGroup = document.createElement("div");
  newExperienceGroup.classList.add("experience-group");
  newExperienceGroup.innerHTML = `
    <label for="experience-company">Company Name:</label>
    <input type="text" class="experience-input" required />
    <label for="experience-position">Position:</label>
    <textarea rows="3" class="brief-input" required></textarea>
  `;
  experienceSection.appendChild(newExperienceGroup);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Personal Info
  const name = (document.querySelector("#name") as HTMLInputElement).value;
  const age = (document.querySelector("#age") as HTMLInputElement).value;
  const address = (document.querySelector("#address") as HTMLInputElement).value;
  const phone = (document.querySelector("#phone") as HTMLInputElement).value;
  const email = (document.querySelector("#email") as HTMLInputElement).value;
  const brief = (document.querySelector("#brief") as HTMLTextAreaElement).value;
  const profilePic = (document.querySelector("#profile-pic") as HTMLInputElement).files![0];

  // Education
  const degrees = document.querySelectorAll(".degree") as NodeListOf<HTMLInputElement>;
  const institutions = document.querySelectorAll(".institution") as NodeListOf<HTMLInputElement>;
  const years = document.querySelectorAll(".years") as NodeListOf<HTMLInputElement>;
  let educationHtml = "";
  degrees.forEach((degree, index) => {
    educationHtml += `<li><strong>Degree:</strong> ${degree.value}
      <p><strong>Institution:</strong> ${institutions[index].value}</p>
      <p><strong>Years:</strong> ${years[index].value}</p></li>`;
  });

  // Skills
  const skills = document.querySelectorAll(".skill") as NodeListOf<HTMLInputElement>;
  const skillPercentages = document.querySelectorAll(".skill-percentage") as NodeListOf<HTMLInputElement>;
  let skillsHtml = "";
  skills.forEach((skill, index) => {
    skillsHtml += `<div class="name-and-percentage">
      <p>${skill.value}</p>
      <p>${skillPercentages[index].value}%</p>
    </div><div class="prograss" style="width: ${skillPercentages[index].value}%"></div>`;
  });

  // Experience
  const experiences = document.querySelectorAll(".experience-group") as NodeListOf<HTMLElement>;
  let experienceHtml = "";
  experiences.forEach((experience) => {
    const companyName = (experience.querySelector(".experience-input") as HTMLInputElement).value;
    const position = (experience.querySelector(".brief-input") as HTMLTextAreaElement).value;
    experienceHtml += `<li><strong>Company:</strong> ${companyName}
      <p><strong>Position:</strong> ${position}</p></li>`;
  });

  // Read Profile Picture as Data URL
  const reader = new FileReader();
  reader.onload = function () {
    const profilePicUrl = reader.result as string;

    // Check if mainContainer exists
    if (!mainContainer) {
      console.error("Main container not found.");
      return;
    }

    // Generate Resume
    mainContainer.innerHTML = `
      <div class="about editable">
        <h1>About Information</h1>
        <div class="profile-pic">
          <img src="${profilePicUrl}" alt="Profile Picture" />
        </div>
        <div class="abt-intro editable">
          <p>${brief}</p>
          <div class="bio-data">
            <div class="col-1">
              <span id="orange">Full name:</span> <span>${name}</span><br />
              <span id="orange">Address:</span> <span>${address}</span>
            </div>
            <div class="col-2">
              <span id="orange">Age:</span> <span>${age}</span><br />
              <span id="orange">Phone:</span> <span>${phone}</span>
            </div>
            <div class="col-3">
              <span id="orange">Freelance:</span> <span>Available</span><br />
              <span id="orange">Email:</span> <span>${email}</span>
            </div>
          </div>
        </div>
      </div>

      <section class="education editable">
        <h1>Education</h1>
        <ol class="education-list">${educationHtml}</ol>
      </section>

      <section class="skills editable">
        <h1>Skills</h1>
        <div class="skill-parent">${skillsHtml}</div>
      </section>

      <section class="experience editable">
        <h1>Experience</h1>
        <ul>${experienceHtml}</ul>
      </section>
    `;

    // Call this function to show the Edit button
    showEditButton();
  };

  // Read the profile picture file
  if (profilePic) {
    reader.readAsDataURL(profilePic);
  }
});

// Function to show Edit Button
function showEditButton() {
  const editButton = document.createElement('button');
  editButton.id = 'edit-btn';
  editButton.innerText = 'Edit';

  // Append Edit button to the main container
  mainContainer.appendChild(editButton);

  // Add functionality to the Edit button
  editButton.addEventListener('click', () => toggleEditMode(editButton));
}

// Function to toggle edit mode
function toggleEditMode(editButton: HTMLElement) {
  const isEditing = editButton.innerText === 'Edit';

  if (isEditing) {
    makeSectionsEditable(true);
    editButton.innerText = 'Save';
  } else {
    makeSectionsEditable(false);
    editButton.innerText = 'Edit';
  }
}

// Function to make sections editable or not
function makeSectionsEditable(isEditable: boolean) {
  const sections = document.querySelectorAll('.editable');

  sections.forEach(section => {
    section.setAttribute('contenteditable', isEditable.toString());
    // section.style.border = isEditable ? '1px solid gray' : 'none'; // Optional visual cue
  });
}

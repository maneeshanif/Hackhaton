

const skillParent = document.querySelector(".skill-parent") as HTMLElement;
const educationParent = document.querySelector(".education-parent") as HTMLElement;
const experienceParent = document.querySelector(".experience-parent") as HTMLElement;

const skillButton = document.querySelector("#show-skill") as HTMLElement;
const educationButton = document.querySelector("#show-education") as HTMLElement;
const experienceButton = document.querySelector("#show-experience") as HTMLElement;

skillButton.addEventListener("click", () => {
  skillParent.classList.toggle("display");
});

educationButton.addEventListener("click", () => {
  educationParent.classList.toggle("display");
});

experienceButton.addEventListener("click", () => {
  experienceParent.classList.toggle("display");
});

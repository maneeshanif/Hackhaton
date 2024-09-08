var skillParent = document.querySelector(".skill-parent");
var educationParent = document.querySelector(".education-parent");
var experienceParent = document.querySelector(".experience-parent");
var skillButton = document.querySelector("#show-skill");
var educationButton = document.querySelector("#show-education");
var experienceButton = document.querySelector("#show-experience");
skillButton.addEventListener("click", function () {
    skillParent.classList.toggle("display");
});
educationButton.addEventListener("click", function () {
    educationParent.classList.toggle("display");
});
experienceButton.addEventListener("click", function () {
    experienceParent.classList.toggle("display");
});

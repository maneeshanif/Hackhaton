document.addEventListener("DOMContentLoaded", function () {
    var _a, _b, _c;
    var form = document.querySelector("#resume-form");
    var mainContainer = document.querySelector(".main");
    var educationSection = document.querySelector("#education-section");
    var skillsSection = document.querySelector("#skills-section");
    var experienceSection = document.querySelector("#experience-section");
    // Adding dynamic education fields
    (_a = document.querySelector("#add-education")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var newEducation = document.createElement("div");
        newEducation.classList.add("education-item");
        newEducation.innerHTML = "\n      <label for=\"degree\">Degree:</label>\n      <input type=\"text\" class=\"degree\" required />\n      <label for=\"institution\">Institution:</label>\n      <input type=\"text\" class=\"institution\" required />\n      <label for=\"years\">Years:</label>\n      <input type=\"text\" class=\"years\" required />\n    ";
        educationSection.appendChild(newEducation);
    });
    // Adding dynamic skill fields
    (_b = document.querySelector("#add-skill")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        var newSkill = document.createElement("div");
        newSkill.classList.add("skill-item");
        newSkill.innerHTML = "\n      <label for=\"skill\">Skill:</label>\n      <input type=\"text\" class=\"skill\" required />\n      <label for=\"skill-percentage\">Skill Percentage:</label>\n      <input type=\"number\" class=\"skill-percentage\" required />\n    ";
        skillsSection.appendChild(newSkill);
    });
    // Adding dynamic experience fields
    (_c = document.querySelector("#add-experience")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        var newExperienceGroup = document.createElement("div");
        newExperienceGroup.classList.add("experience-group");
        newExperienceGroup.innerHTML = "\n      <label for=\"experience-company\">Company Name:</label>\n      <input type=\"text\" class=\"experience-input\" required />\n      <label for=\"experience-position\">Position:</label>\n      <textarea rows=\"3\" class=\"brief-input\" required></textarea>\n    ";
        experienceSection.appendChild(newExperienceGroup);
    });
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        // Personal Info
        var name = document.querySelector("#name").value;
        var age = document.querySelector("#age").value;
        var address = document.querySelector("#address")
            .value;
        var phone = document.querySelector("#phone").value;
        var email = document.querySelector("#email").value;
        var brief = document.querySelector("#brief")
            .value;
        var profilePic = document.querySelector("#profile-pic").files[0];
        // Education
        var degrees = document.querySelectorAll(".degree");
        var institutions = document.querySelectorAll(".institution");
        var years = document.querySelectorAll(".years");
        var educationHtml = "";
        degrees.forEach(function (degree, index) {
            educationHtml += "<li><strong>Degree:</strong> ".concat(degree.value, "\n        <p><strong>Institution:</strong> ").concat(institutions[index].value, "</p>\n        <p><strong>Years:</strong> ").concat(years[index].value, "</p></li>");
        });
        // Skills
        var skills = document.querySelectorAll(".skill");
        var skillPercentages = document.querySelectorAll(".skill-percentage");
        var skillsHtml = "";
        skills.forEach(function (skill, index) {
            skillsHtml += "<div class=\"name-and-percentage\">\n        <p>".concat(skill.value, "</p>\n        <p>").concat(skillPercentages[index].value, "%</p>\n      </div><div class=\"prograss\" style=\"width: ").concat(skillPercentages[index].value, "%\"></div>");
        });
        // Experience
        var experiences = document.querySelectorAll(".experience-group");
        var experienceHtml = "";
        experiences.forEach(function (experience) {
            var companyName = experience.querySelector(".experience-input").value;
            var position = experience.querySelector(".brief-input").value;
            experienceHtml += "<li><strong>Company:</strong> ".concat(companyName, "\n        <p><strong>Position:</strong> ").concat(position, "</p></li>");
        });
        // Read Profile Picture as Data URL
        var reader = new FileReader();
        reader.onload = function () {
            var _a;
            var profilePicUrl = reader.result;
            if (!mainContainer) {
                console.error("Main container not found.");
                return;
            }
            // Generate Resume
            mainContainer.innerHTML = "\n        <div class=\"about editable\">\n          <h1>About Information</h1>\n          <div class=\"profile-pic\">\n            <img src=\"".concat(profilePicUrl, "\" alt=\"Profile Picture\" />\n          </div>\n          <div class=\"abt-intro editable\">\n            <p>").concat(brief, "</p>\n            <div class=\"bio-data\">\n              <div class=\"col-1\">\n                <span id=\"orange\">Full name:</span> <span>").concat(name, "</span><br />\n                <span id=\"orange\">Address:</span> <span>").concat(address, "</span>\n              </div>\n              <div class=\"col-2\">\n                <span id=\"orange\">Age:</span> <span>").concat(age, "</span><br />\n                <span id=\"orange\">Phone:</span> <span>").concat(phone, "</span>\n              </div>\n              <div class=\"col-3\">\n                <span id=\"orange\">Freelance:</span> <span>Available</span><br />\n                <span id=\"orange\">Email:</span> <span>").concat(email, "</span>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <section class=\"education editable\">\n          <h1>Education</h1>\n          <ol class=\"education-list\">").concat(educationHtml, "</ol>\n        </section>\n\n        <section class=\"skills editable\">\n          <h1>Skills</h1>\n          <div class=\"skill-parent\">").concat(skillsHtml, "</div>\n        </section>\n\n        <section class=\"experience editable\">\n          <h1>Experience</h1>\n          <ul>").concat(experienceHtml, "</ul>\n        </section>\n\n        <button type=\"button\" id=\"share-link\">Copy Url Link</button>\n        <button type=\"button\" id=\"download-pdf\">Download PDF</button>\n      ");
            (_a = document.getElementById('download-pdf')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                // const resume = document.getElementById('resume-form'); // Get the resume element
                window.print();
            });
            // Show Edit Button
            showEditButton();
            // Display and copy the shareable link immediately after generation
            var username = name.trim().replace(/\s+/g, "-").toLowerCase();
            var resumeUrl = "https://hackhaton-5.vercel.app/".concat(username);
            var shareLinkButton = document.querySelector("#share-link");
            shareLinkButton === null || shareLinkButton === void 0 ? void 0 : shareLinkButton.addEventListener("click", function () {
                copyLinkToClipboard(resumeUrl);
            });
            var linkContainer = document.createElement("div");
            linkContainer.innerHTML = "<p>Your resume link: <a href=\"".concat(resumeUrl, "\" target=\"_blank\">").concat(resumeUrl, "</a></p>");
            mainContainer.appendChild(linkContainer);
        };
        // Read the profile picture file
        if (profilePic) {
            reader.readAsDataURL(profilePic);
        }
    });
    // Function to copy link to clipboard
    function copyLinkToClipboard(resumeUrl) {
        if (resumeUrl) {
            navigator.clipboard
                .writeText(resumeUrl)
                .then(function () {
                alert("Resume link copied to clipboard!");
            })
                .catch(function (err) {
                console.error("Failed to copy the resume link: ", err);
            });
        }
    }
    // download pdf button script here
    // Function to show Edit Button
    function showEditButton() {
        var editButton = document.createElement("button");
        editButton.id = "edit-btn";
        editButton.innerText = "Edit";
        mainContainer.appendChild(editButton);
        editButton.addEventListener("click", function () { return toggleEditMode(editButton); });
    }
    // Function to toggle between Edit and Save mode
    function toggleEditMode(editButton) {
        if (editButton.innerText === "Edit") {
            enableEdit();
            editButton.innerText = "Save";
        }
        else {
            saveChanges();
            editButton.innerText = "Edit";
        }
    }
    // Function to enable editing of the resume
    function enableEdit() {
        var editableElements = document.querySelectorAll(".editable");
        editableElements.forEach(function (element) {
            element.setAttribute("contenteditable", "true");
            element.classList.add("editable-border");
        });
    }
    // Function to save changes and disable editing
    function saveChanges() {
        var editableElements = document.querySelectorAll(".editable");
        editableElements.forEach(function (element) {
            element.removeAttribute("contenteditable");
            element.classList.remove("editable-border");
        });
    }
});

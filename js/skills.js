// =====================================
// Require Login for My Skills Page
// =====================================

const skillsLoggedIn =
    sessionStorage.getItem("skillswapLoggedIn") === "true";

const skillsActiveUser =
    sessionStorage.getItem("skillswapActiveUser");

if (!skillsLoggedIn || !skillsActiveUser) {
    window.location.replace("index.html");
}

// ===============================
// SkillSwap – My Skills Page
// ===============================

// My Skills display container
const dashboardSkills = document.getElementById("dashboard-skills");

// Default skills
const currentSkills = {
    teachSkill: "",
    teachSkills: [],
    learnSkill: ""
};

// =====================================
// Retrieve Skills for Active User
// =====================================

// Identify the currently logged-in account
const activeUser = sessionStorage.getItem("skillswapActiveUser");

// Retrieve this user's saved profile
const savedProfile = activeUser
    ? localStorage.getItem("skillswapProfile_" + activeUser)
    : null;

if (savedProfile) {
    const profile = JSON.parse(savedProfile);

    currentSkills.teachSkill = profile.teachSkill || "";

    currentSkills.teachSkills = Array.isArray(profile.teachSkills)
        ? profile.teachSkills
        : currentSkills.teachSkill
            ? [currentSkills.teachSkill]
            : [];

    currentSkills.learnSkill = profile.learnSkill || "";
}

// =====================================
// Skills Completion Message
// =====================================

const skillsMessage =
    !currentSkills.teachSkill || !currentSkills.learnSkill
        ? "<p class='skills-notice'>You haven't added your skills yet. Click Edit Skills to get started.</p>"
        : "";

// Display saved skills
dashboardSkills.innerHTML = `
    <h3>My Skills</h3>

    ${skillsMessage}

    <div>
        <strong>Skills I Can Teach:</strong>
        <ul>
            ${currentSkills.teachSkills
                .map((skill, index) => `
                    <li>
                        ${skill}
                        <button
                            type="button"
                            class="remove-skill-button"
                            data-skill-index="${index}"
                            ${currentSkills.teachSkills.length === 1 ? "disabled" : ""}
                        >
                            Remove
                        </button>
                    </li>
                `)
                .join("")}
        </ul>
    </div>

    <p>
        <strong>Skill I Want to Learn:</strong>
        ${currentSkills.learnSkill}
    </p>
`;

// Handle removing individual teaching skills
document.querySelectorAll(".remove-skill-button").forEach(button => {
    button.addEventListener("click", function () {

        // Every user must keep at least one teaching skill
        if (currentSkills.teachSkills.length <= 1) {
            alert("You must have at least one teaching skill on your profile.");
            return;
        }

        const skillIndex = Number(this.dataset.skillIndex);

        // Remove the selected teaching skill
        currentSkills.teachSkills.splice(skillIndex, 1);

        // Retrieve the active user's saved profile
        const savedProfile = JSON.parse(
            localStorage.getItem("skillswapProfile_" + activeUser) || "{}"
        );

        // Update teaching skills while preserving other profile information
        savedProfile.teachSkills = [...currentSkills.teachSkills];
        savedProfile.teachSkill = currentSkills.teachSkills[0];

        // Save the updated profile
        localStorage.setItem(
            "skillswapProfile_" + activeUser,
            JSON.stringify(savedProfile)
        );

        window.location.reload();
    });
});

// ===============================
// Edit Skills Button
// ===============================

const editSkillsButton = document.createElement("button");

editSkillsButton.id = "edit-skills-button";
editSkillsButton.textContent = "Edit Skills";

dashboardSkills.appendChild(editSkillsButton);

// ===============================
// Open Edit Skills Form
// ===============================

editSkillsButton.addEventListener("click", function () {
    dashboardSkills.innerHTML = `
        <h3>Edit My Skills</h3>

        <label for="edit-teach-skill">Add a Teaching Skill</label>
        <input type="text" id="edit-teach-skill" placeholder="Example: Python, Photography, Java">

        <p>Your existing teaching skills will be preserved.</p>

        <label for="edit-learn-skill">Skill I Want to Learn</label>
        <input type="text" id="edit-learn-skill">

        <button id="save-skills-button">Save Skills</button>
    `;

    // Keep the new teaching skill field empty
    document.getElementById("edit-teach-skill").value = "";
        currentSkills.teachSkill === "Not added yet" ? "" : currentSkills.teachSkill;

    document.getElementById("edit-learn-skill").value =
        currentSkills.learnSkill === "Not added yet" ? "" : currentSkills.learnSkill;

    // ===============================
    // Save Updated Skills
    // ===============================

    document.getElementById("save-skills-button").addEventListener("click", function () {

        const teachSkill = document.getElementById("edit-teach-skill").value.trim();
        const learnSkill = document.getElementById("edit-learn-skill").value.trim();

        if (!teachSkill && !learnSkill) {
            alert("Please enter a teaching skill or a learning skill.");
            return;
        }

        if (teachSkill) {
            const alreadyExists = currentSkills.teachSkills.some(
                skill => skill.toLowerCase() === teachSkill.toLowerCase()
            );

            if (!alreadyExists) {
                currentSkills.teachSkills.push(teachSkill);
            }
        }

        if (learnSkill) {
            currentSkills.learnSkill = learnSkill;
        }

        // Make sure an account is logged in
        if (!activeUser) {
            alert("Please log in before saving your skills.");
            return;
        }

        // Retrieve the active user's profile
        const savedProfile = JSON.parse(
            localStorage.getItem("skillswapProfile_" + activeUser) || "{}"
        );

        // Update only the skills
        savedProfile.teachSkills = [...currentSkills.teachSkills];

        // Keep the original field for compatibility with My Profile
        savedProfile.teachSkill = currentSkills.teachSkills[0] || "";

        // Preserve the existing learning skill
        savedProfile.learnSkill = currentSkills.learnSkill;

        // Save the updated profile
        localStorage.setItem(
            "skillswapProfile_" + activeUser,
            JSON.stringify(savedProfile)
        );

        window.location.reload();
        
    });  
});
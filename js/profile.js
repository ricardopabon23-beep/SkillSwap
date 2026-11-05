// =====================================
// Require Login for Profile Page
// =====================================

const profileLoggedIn =
    sessionStorage.getItem("skillswapLoggedIn") === "true";

const profileActiveUser =
    sessionStorage.getItem("skillswapActiveUser");

if (!profileLoggedIn || !profileActiveUser) {
    window.location.replace("index.html");
}

// ===============================
// SkillSwap - Profile Page
// ===============================

// Profile display container
const dashboardProfile = document.getElementById("dashboard-profile");

// Default profile information
const currentProfile = {
    name: "",
    teachSkill: "",
    teachSkills: [],
    learnSkill: "",
    bio: ""
};

// =====================================
// Retrieve Profile for Active User
// =====================================

// Identify the currently logged-in account
const activeUser = sessionStorage.getItem("skillswapActiveUser");

// Retrieve this user's saved profile
const savedProfile = activeUser
    ? localStorage.getItem("skillswapProfile_" + activeUser)
    : null;

if (savedProfile) {
    Object.assign(currentProfile, JSON.parse(savedProfile));
}

// Support older profiles that contain only one teaching skill
currentProfile.teachSkills =
    Array.isArray(currentProfile.teachSkills) &&
    currentProfile.teachSkills.length > 0
        ? currentProfile.teachSkills
        : currentProfile.teachSkill
            ? [currentProfile.teachSkill]
            : [];

// =====================================
// Profile Completion Message
// =====================================

const profileMessage =
    !currentProfile.name || !currentProfile.bio
        ? "<p class='profile-notice'>Your profile is not complete yet. Click Edit Profile to add your information.</p>"
        : "";

// Display the profile information
dashboardProfile.innerHTML = `
${profileMessage}

    <p><strong>Name:</strong> ${currentProfile.name}</p>    
    
    <div>
        <strong>Skills I Can Teach:</strong>
        <ul>
            ${currentProfile.teachSkills
                .map(skill => `<li>${skill}</li>`)
                .join("")}
        </ul>
    </div>
    <p><strong>Skill I Want to Learn:</strong> ${currentProfile.learnSkill}</p>
    <p><strong>About Me:</strong> ${currentProfile.bio}</p>
`;

// ===============================
// Edit Profile Button
// ===============================

const editProfileButton = document.createElement("button");

editProfileButton.id = "edit-profile-button";
editProfileButton.textContent = "Edit Profile";

dashboardProfile.appendChild(editProfileButton);

// ===============================
// Open Edit Profile Form
// ===============================

editProfileButton.addEventListener("click", function () {
    dashboardProfile.innerHTML = `
        <h3>Edit Profile</h3>

        <label for="edit-name">Name</label>
        <input type="text" id="edit-name">

        <label for="edit-learn-skill">Skill I Want to Learn</label>
        <input type="text" id="edit-learn-skill">

        <label for="edit-bio">About Me</label>
        <textarea id="edit-bio"></textarea>

        <button id="save-profile-button">Save Profile</button>
    `;

    document.getElementById("edit-name").value = currentProfile.name;
    document.getElementById("edit-learn-skill").value = currentProfile.learnSkill;
    document.getElementById("edit-bio").value = currentProfile.bio;
    document.getElementById("save-profile-button").addEventListener("click", function () {

    const name = document.getElementById("edit-name").value.trim();
    const learnSkill = document.getElementById("edit-learn-skill").value.trim();
    const bio = document.getElementById("edit-bio").value.trim();

    if (!name || !learnSkill || !bio) {
        alert("Please complete all profile fields.");
        return;
    }

    currentProfile.name = name;
    currentProfile.learnSkill = learnSkill;
    currentProfile.bio = bio;

    if (!activeUser) {
        alert("Please log in before saving your profile.");
        return;
    }

    // Save the profile under the active user's account
    localStorage.setItem(
        "skillswapProfile_" + activeUser,
        JSON.stringify(currentProfile)
    );

        window.location.reload();
    });

});
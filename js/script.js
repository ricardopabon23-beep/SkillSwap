const profileCard = document.getElementById("profile-card");
const dashboardProfile = document.getElementById("dashboard-profile");
const mySkillsCard = document.getElementById("my-skills-card");
const myConnectionsCard = document.getElementById("my-connections-card");
const notificationsCard = document.getElementById("notifications-card");

const findSkillButton = document.getElementById("find-skill-button");
const dashboardFindSkillButton = document.getElementById("dashboard-find-skill");
const shareSkillButton = document.getElementById("share-skill-button");
const dashboardShareSkillButton = document.getElementById("dashboard-share-skill");
const shareSkillForm = document.getElementById("share-skill-form");
const nameInput = document.getElementById("name-input");
const skillShareInput = document.getElementById("skill-share-input");
const bioInput = document.getElementById("bio-input");
const bioCounter = document.getElementById("bio-counter");
const submitSkillButton = document.getElementById("submit-skill-button");
const clearShareSkillButton = document.getElementById("clear-share-skill-button");
const shareResult = document.getElementById("share-result");

const skillSearch = document.getElementById("skill-search");
const skillInput = document.getElementById("skill-input");
const searchButton = document.getElementById("search-button");
const clearSearchButton = document.getElementById("clear-search-button");
const searchResult = document.getElementById("search-result");
const matchResult = document.getElementById("match-result");
const profileResult = document.getElementById("profile-result");
const skillsContainer = document.getElementById("skills-container");
const browseSkillsSection = document.getElementById("browse-skills");
const skillMatchSection = document.getElementById("skill-match");
const exploreMatchesButton = document.getElementById("explore-matches-button");

const browseSkillsNav = document.getElementById("browse-skills-nav");
const footerBrowseSkills = document.getElementById("footer-browse-skills");
const dashboardNav = document.getElementById("dashboard-nav");
const signupButton = document.getElementById("signup-button");
const footerSignupButton = document.getElementById("footer-signup-button");
const signupSection = document.getElementById("signup-section");
const signupName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const createAccountButton = document.getElementById("create-account-button");
const signupResult = document.getElementById("signup-result");
const goToLoginButton = document.getElementById("go-to-login-button");

const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const footerLogoutButton = document.getElementById("footer-logout-button");
const footerLoginButton = document.getElementById("footer-login-button");
const loginSection = document.getElementById("login-section");
const heroSection = document.getElementById("home");
const navHomeButton = document.getElementById("nav-home-button");
const footerHomeButton = document.getElementById("footer-home-button");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginSubmitButton = document.getElementById("login-submit-button");
const loginResult = document.getElementById("login-result");
const userDashboard = document.getElementById("user-dashboard");

// Track whether the student is logged in
let isLoggedIn = false;

// =====================================
// Find Skill and Share Skill Buttons
// =====================================

findSkillButton.addEventListener("click", function(event) {
    event.preventDefault();

    if (!isLoggedIn) {
    alert("Please log in to find a skill.");
    return;
}

    skillSearch.style.display = "block";
    shareSkillForm.style.display = "none";

    skillInput.focus();
});

dashboardFindSkillButton.addEventListener("click", function() {
    findSkillButton.click();
    skillSearch.scrollIntoView({ behavior: "smooth" });
});

exploreMatchesButton.addEventListener("click", function(event) {
    event.preventDefault();

    if (!isLoggedIn) {
        findSkillButton.click();
        return;
    }

    skillSearch.style.display = "block";
    shareSkillForm.style.display = "none";

    skillSearch.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    skillInput.focus({ preventScroll: true });
});

shareSkillButton.addEventListener("click", function(event) {
    event.preventDefault();

    if (!isLoggedIn) {
    alert("Please log in to share your skill.");
    return;
}

    shareSkillForm.style.display = "block";
    skillSearch.style.display = "none";

    nameInput.focus();
});

dashboardShareSkillButton.addEventListener("click", function() {
    shareSkillButton.click();
    shareSkillForm.scrollIntoView({ behavior: "smooth" });
});

// =====================================
// Sign Up and Login Navigation
// =====================================

signupButton.addEventListener("click", function(event) {
    event.preventDefault();

    signupSection.style.display = "block";
    goToLoginButton.hidden = true;
    loginSection.style.display = "none";

    loginResult.textContent = "";
    loginResult.className = "";

    signupSection.scrollIntoView({
        behavior: "smooth"
    });
});

footerSignupButton.addEventListener("click", function(event) {
    event.preventDefault();
    signupButton.click();
});

loginButton.addEventListener("click", function(event) {
    event.preventDefault();

    loginSection.style.display = "block";
    signupSection.style.display = "none";

    signupResult.textContent = "";
    signupResult.className = "";

    loginSection.scrollIntoView({
        behavior: "smooth"
    });
});

goToLoginButton.addEventListener("click", function() {
    loginButton.click();
});

footerLoginButton.addEventListener("click", function(event) {
    event.preventDefault();
    loginButton.click();
});

// =====================================
// Login Form
// =====================================

loginSubmitButton.addEventListener("click", function() {

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    if (email === "" || password === "") {
        loginResult.textContent =
            "Please enter your email and password.";
        loginResult.className = "error";
        return;
    }

    if (!email.includes("@")) {
        loginResult.textContent =
            "Please enter a valid email address.";
        loginResult.className = "error";
        return;
    }

    loginResult.textContent = "Login information accepted.";
    loginResult.className = "success";

    isLoggedIn = true;
    loginSection.style.display = "none";
    heroSection.style.display = "none";
    
    loginButton.hidden = true;
    signupButton.hidden = true;
    logoutButton.hidden = false;

    footerLoginButton.hidden = true;
    footerSignupButton.hidden = true;
    footerLogoutButton.hidden = false;
    
    userDashboard.style.display = "block";

    browseSkillsSection.hidden = false;
    browseSkillsNav.hidden = false;
    footerBrowseSkills.hidden = false;
    dashboardNav.hidden = false;
    skillMatchSection.hidden = false;
    
    userDashboard.scrollIntoView({
        behavior: "smooth"
    });

    loginEmail.value = "";
    loginPassword.value = "";
});

logoutButton.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.reload();
});

footerLogoutButton.addEventListener("click", function(event) {
    event.preventDefault();
    logoutButton.click();
});

loginPassword.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        loginSubmitButton.click();
    }
});


// =====================================
// Dashboard Profile Data
// =====================================

// Temporary profile information.
// Later, this information will come from a database.

const currentProfile = {
    name: "SkillSwap User",
    teachSkill: "Not added yet",
    learnSkill: "Not added yet",
    bio: "No bio added yet"
};

// =====================================
// Connection Data
// =====================================

// Sarah is a sample incoming connection request.
// Connection information is currently temporary.

const connections = [
    {
        name: "Sarah",
        skill: "Graphic Design",
        status: "pending",
        direction: "incoming"
    },
    {
        name: "Alex",
        skill: "Java",
        status: "accepted",
        direction: "outgoing"
    }
];

// Temporary notifications for accepted connection requests
const acceptedRequestNotifications = [
    {
        name: "Alex",
        skill: "Java",
        read: false
    }
];

// =====================================
// Display Profile Information
// =====================================

// Safely display profile fields as text.

function addProfileField(label, value) {

    const paragraph = document.createElement("p");
    const heading = document.createElement("strong");

    heading.textContent = label + ": ";

    paragraph.appendChild(heading);
    paragraph.appendChild(document.createTextNode(value));

    dashboardProfile.appendChild(paragraph);
}


// =====================================
// Display My Profile
// =====================================

function displayProfile() {

    dashboardProfile.innerHTML = "<h3>My Profile</h3>";

    addProfileField("Name", currentProfile.name);
    addProfileField("Skill I Teach", currentProfile.teachSkill);
    addProfileField("Skill I Want to Learn", currentProfile.learnSkill);
    addProfileField("Bio", currentProfile.bio);

    const editButton = document.createElement("button");

    editButton.id = "edit-profile-button";
    editButton.textContent = "Edit Profile";

    dashboardProfile.appendChild(editButton);
}


// =====================================
// Open Edit Profile Form
// =====================================

function openEditProfile() {

    dashboardProfile.innerHTML =
        "<h3>Edit Profile</h3>" +
        "<input type='text' id='edit-name' placeholder='Your name'>" +
        "<input type='text' id='edit-teach-skill' placeholder='Skill you can teach'>" +
        "<input type='text' id='edit-learn-skill' placeholder='Skill you want to learn'>" +
        "<textarea id='edit-bio' placeholder='Tell us about yourself'></textarea>" +
        "<button id='save-profile-button'>Save Profile</button>";

    document.getElementById("edit-name").value =
        currentProfile.name === "SkillSwap User"
            ? ""
            : currentProfile.name;

    document.getElementById("edit-teach-skill").value =
        currentProfile.teachSkill === "Not added yet"
            ? ""
            : currentProfile.teachSkill;

    document.getElementById("edit-learn-skill").value =
        currentProfile.learnSkill === "Not added yet"
            ? ""
            : currentProfile.learnSkill;

    document.getElementById("edit-bio").value =
        currentProfile.bio === "No bio added yet"
            ? ""
            : currentProfile.bio;
}


// =====================================
// Dashboard My Profile Card
// =====================================

profileCard.addEventListener("click", function() {
    displayProfile();
});


// =====================================
// Edit Skills Form
// =====================================

function openEditSkills() {

    dashboardProfile.innerHTML =
        "<h3>Edit Skills</h3>" +
        "<input type='text' id='edit-teach-skill' placeholder='Skill I can teach'>" +
        "<input type='text' id='edit-learn-skill' placeholder='Skill I want to learn'>" +
        "<button id='save-skills-button'>Save Skills</button>";

    document.getElementById("edit-teach-skill").value =
        currentProfile.teachSkill === "Not added yet"
            ? ""
            : currentProfile.teachSkill;

    document.getElementById("edit-learn-skill").value =
        currentProfile.learnSkill === "Not added yet"
            ? ""
            : currentProfile.learnSkill;
}


// =====================================
// Display My Skills
// =====================================

function displayMySkills() {

    dashboardProfile.innerHTML = "<h3>My Skills</h3>";

    addProfileField("Skill I Teach", currentProfile.teachSkill);
    addProfileField("Skill I Want to Learn", currentProfile.learnSkill);

    const editButton = document.createElement("button");

    editButton.id = "edit-skills-button";
    editButton.textContent = "Edit Skills";

    dashboardProfile.appendChild(editButton);
}


// =====================================
// Dashboard My Skills Card
// =====================================

mySkillsCard.addEventListener("click", function() {
    displayMySkills();
});


// =====================================
// Dashboard My Connections Card
// =====================================

myConnectionsCard.addEventListener("click", function() {
    displayMyConnections();
});


// =====================================
// Update Notifications
// =====================================

function displayNotifications() {

    dashboardProfile.innerHTML =
        "<h3>Notifications</h3>" +
        "<p>Stay updated on your SkillSwap activity.</p>" +
        "<div id='notifications-list'>" +
        "<p>No notifications yet.</p>" +
        "</div>";

    updateNotifications();
}

// Update the Dashboard notification counter
function updateNotificationCount() {

    const notificationCount =
        document.getElementById("notification-count");

    const pendingCount = connections.filter(function(connection) {
        return connection.status === "pending" &&
               connection.direction === "incoming";
    }).length;

    const unreadAcceptedCount = acceptedRequestNotifications.filter(function(notification) {
        return notification.read === false;
    }).length;

const totalNotifications =
    pendingCount + unreadAcceptedCount;

    notificationCount.textContent = totalNotifications;
    notificationCount.hidden = totalNotifications === 0;
}

// Display the notification count when the page loads
updateNotificationCount();

function updateNotifications() {

    const notificationsList =
        document.getElementById("notifications-list");

    const incomingRequests = connections.filter(function(connection) {
        return connection.status === "pending" &&
               connection.direction === "incoming";
    });

    if (incomingRequests.length === 0 &&
        acceptedRequestNotifications.every(function(notification) {
            return notification.read === true;
        })) {

        notificationsList.textContent = "No notifications yet.";
        return;
    }

    notificationsList.innerHTML = "";

    incomingRequests.forEach(function(connection) {

        const paragraph = document.createElement("p");

        paragraph.textContent =
            connection.name + " sent you a connection request.";

        // Only this button opens My Connections.
        const viewRequest = document.createElement("button");

        viewRequest.type = "button";
        viewRequest.textContent = "Click to view request →";
        viewRequest.className = "notification-action";

        viewRequest.addEventListener("click", function() {
            displayMyConnections();
        });

        paragraph.appendChild(viewRequest);
        notificationsList.appendChild(paragraph);

    });

        // Display notifications for accepted connection requests
    acceptedRequestNotifications
    .filter(function(notification) {
        return notification.read === false;
    })
    .forEach(function(notification) {

        const paragraph = document.createElement("p");

        paragraph.textContent =
            notification.name + " accepted your connection request!";

            const viewConnection = document.createElement("button");

            viewConnection.type = "button";
            viewConnection.textContent = "View connection →";
            viewConnection.className = "notification-action";

            viewConnection.addEventListener("click", function() {
                displayMyConnections();
            });

            paragraph.appendChild(viewConnection);

            // Create the Mark as Read button
            const markAsReadButton = document.createElement("button");

            markAsReadButton.type = "button";
            markAsReadButton.textContent = "Mark as Read";
            markAsReadButton.className = "notification-action";

            markAsReadButton.addEventListener("click", function() {
            notification.read = true;

            updateNotificationCount();
            updateNotifications();
        });

            paragraph.appendChild(markAsReadButton);

            notificationsList.appendChild(paragraph);

    });

}

// =====================================
// Dashboard Notifications Card
// =====================================

notificationsCard.addEventListener("click", function() {
    displayNotifications();
});

// =====================================
// Display My Connections
// =====================================

function displayMyConnections() {

    dashboardProfile.innerHTML =
        "<h3>My Connections</h3>" +
        "<p>Manage your SkillSwap connections here.</p>" +
        "<h4>Pending Requests</h4>" +
        "<div id='pending-connections'><p>No pending requests.</p></div>" +
        "<h4>Accepted Connections</h4>" +
        "<div id='accepted-connections'><p>No accepted connections yet.</p></div>";

    updateConnections();
}

// =====================================
// Update My Connections
// =====================================

function updateConnections() {

    const pendingContainer =
        document.getElementById("pending-connections");

    const acceptedContainer =
        document.getElementById("accepted-connections");

    pendingContainer.innerHTML = "";
    acceptedContainer.innerHTML = "";

    connections.forEach(function(connection) {

        // Pending connection requests.

        if (connection.status === "pending") {

            const paragraph = document.createElement("p");

            if (connection.direction === "incoming") {

                paragraph.textContent =
                    connection.name + " - " +
                    connection.skill + " (Request Received)";

                // Accept button.

                const acceptButton = document.createElement("button");

                acceptButton.textContent = "Accept";
                acceptButton.className = "accept-connection-button";

                acceptButton.addEventListener("click", function() {

                    connection.status = "accepted";

                    updateNotificationCount();

                    displayMyConnections();

                });

                // Decline button.

                const declineButton = document.createElement("button");

                declineButton.textContent = "Decline";
                declineButton.className = "decline-connection-button";

                declineButton.addEventListener("click", function() {

                    const connectionIndex =
                        connections.indexOf(connection);

                    if (connectionIndex !== -1) {
                        connections.splice(connectionIndex, 1);
                    }

                    updateNotificationCount();

                    displayMyConnections();

                });

                paragraph.appendChild(document.createTextNode(" "));
                paragraph.appendChild(acceptButton);

                paragraph.appendChild(document.createTextNode(" "));
                paragraph.appendChild(declineButton);

            } else {

                paragraph.textContent =
                    connection.name + " - " +
                    connection.skill + " (Request Sent)";

            }

            pendingContainer.appendChild(paragraph);
        }

        // Accepted connections.

        if (connection.status === "accepted") {

            const paragraph = document.createElement("p");

            paragraph.textContent =
                connection.name + " - " +
                connection.skill + " (Connected)";

            acceptedContainer.appendChild(paragraph);
        }

    });

    // Show messages when the sections are empty.

    if (pendingContainer.children.length === 0) {
        pendingContainer.textContent = "No pending requests.";
    }

    if (acceptedContainer.children.length === 0) {
        acceptedContainer.textContent = "No accepted connections yet.";
    }
}


// =====================================
// Edit and Save Profile and Skills
// =====================================

// Event delegation for dynamically created buttons.

dashboardProfile.addEventListener("click", function(event) {

    // Edit Profile.

    if (event.target.id === "edit-profile-button") {
        openEditProfile();
    }

    // Edit Skills.

    if (event.target.id === "edit-skills-button") {
        openEditSkills();
    }

    // Save Skills.

    if (event.target.id === "save-skills-button") {

        const teachSkill =
            document.getElementById("edit-teach-skill").value.trim();

        const learnSkill =
            document.getElementById("edit-learn-skill").value.trim();

        if (teachSkill === "" || learnSkill === "") {
            alert("Please complete both skill fields.");
            return;
        }

        currentProfile.teachSkill = teachSkill;
        currentProfile.learnSkill = learnSkill;

        displayMySkills();
    }

    // Save Profile.

    if (event.target.id === "save-profile-button") {

        const profileName =
            document.getElementById("edit-name").value.trim();

        const teachSkill =
            document.getElementById("edit-teach-skill").value.trim();

        const learnSkill =
            document.getElementById("edit-learn-skill").value.trim();

        const profileBio =
            document.getElementById("edit-bio").value.trim();

        if (
            profileName === "" ||
            teachSkill === "" ||
            learnSkill === "" ||
            profileBio === ""
        ) {
            alert("Please complete all profile fields.");
            return;
        }

        currentProfile.name = profileName;
        currentProfile.teachSkill = teachSkill;
        currentProfile.learnSkill = learnSkill;
        currentProfile.bio = profileBio;

        displayProfile();
    }

});


// =====================================
// Create Account
// =====================================

createAccountButton.addEventListener("click", function() {

    const fullName = signupName.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value;

    if (fullName === "" || email === "" || password === "") {
        signupResult.textContent = "Please complete all fields.";
        signupResult.className = "error";
        return;
    }

    if (password.length < 8) {
        signupResult.textContent =
            "Password must be at least 8 characters.";
        signupResult.className = "error";
        return;
    }

    if (!email.includes("@")) {
        signupResult.textContent =
            "Please enter a valid email address.";
        signupResult.className = "error";
        return;
    }

    signupResult.textContent = "Account created successfully!";
    signupResult.className = "success";
    goToLoginButton.hidden = false;

    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
});


// =====================================
// Skill Data
// =====================================

const skills = [
    "Java",
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "Graphic Design",
    "Photography",
    "Guitar"
];


// =====================================
// Member Data
// =====================================

const members = [
    {
        name: "Alex",
        skill: "Java",
        bio: "Computer science student who enjoys helping beginners learn Java."
    },
    {
        name: "Maria",
        skill: "HTML",
        bio: "Web development student who enjoys teaching the basics of HTML."
    },
    {
        name: "James",
        skill: "Photography",
        bio: "Photography enthusiast who enjoys helping others improve their camera skills."
    },
    {
        name: "Sophia",
        skill: "JavaScript",
        bio: "Web developer who enjoys teaching JavaScript and interactive web design."
    },
    {
        name: "Daniel",
        skill: "Python",
        bio: "Python programmer who enjoys helping beginners learn programming fundamentals."
    }
];


// =====================================
// Display Browse Skills
// =====================================

function displaySkills() {

    skillsContainer.innerHTML = "";

    skills.forEach(function(skill) {

        const skillCard = document.createElement("div");

        skillCard.classList.add("browse-skill-card");
        skillCard.textContent = skill;

        skillCard.addEventListener("click", function() {

            skillSearch.style.display = "block";
            shareSkillForm.style.display = "none";

            skillInput.value = skill;
            searchButton.click();

            skillSearch.scrollIntoView({
                behavior: "smooth"
            });

        });

        skillsContainer.appendChild(skillCard);
    });
}

displaySkills();


// =====================================
// Search for Skills
// =====================================

searchButton.addEventListener("click", function() {

    const skill = skillInput.value.trim();

    matchResult.innerHTML = "";
    profileResult.innerHTML = "";

    if (skill === "") {
        searchResult.textContent =
            "Please enter a skill to search for.";
        return;
    }

    const matchingSkills = skills.filter(function(item) {
        return item.toLowerCase().includes(skill.toLowerCase());
    });

    if (matchingSkills.length > 0) {

        searchResult.innerHTML = "";

        matchingSkills.forEach(function(item) {

            const skillCard = document.createElement("div");

            skillCard.classList.add("skill-card");
            skillCard.textContent = item;

            skillCard.addEventListener("click", function() {

                const matchingMembers = members.filter(function(member) {
                    return member.skill.toLowerCase() === item.toLowerCase();
                });

                if (matchingMembers.length > 0) {

                    matchResult.innerHTML =
                        "<h3>People who can help you learn " +
                        item +
                        "</h3>";

                    matchingMembers.forEach(function(member) {

                        const memberCard = document.createElement("div");

                        memberCard.classList.add("member-card");

                        memberCard.textContent =
                            member.name + " - " + member.skill;

                        memberCard.addEventListener("click", function() {

                            profileResult.innerHTML =
                                "<div class='profile-picture'>👤</div>" +
                                "<h3>" + member.name + "</h3>" +
                                "<p class='profile-skill'>Skill: " +
                                member.skill + "</p>" +
                                "<p class='profile-bio'>" +
                                member.bio + "</p>" +
                                "<p class='profile-help'><strong>Can help you learn:</strong> " +
                                member.skill + "</p>" +
                                "<button class='connect-button'>Connect</button>";

                            const connectButton =
                                profileResult.querySelector(".connect-button");

                            // Check whether a request already exists.

                            const existingRequest = connections.find(function(connection) {
                                return connection.name === member.name &&
                                       connection.skill === member.skill;
                            });

                            if (existingRequest) {
                                if (existingRequest.status === "accepted") {
                                    connectButton.textContent = "Connected";
                                } else {
                                    connectButton.textContent = "Request Sent";
                                }

                                    connectButton.disabled = true;
                            }

                            // Send connection request.

                            connectButton.addEventListener("click", function() {

                                connections.push({
                                    name: member.name,
                                    skill: member.skill,
                                    status: "pending",
                                    direction: "outgoing"
                                });

                                connectButton.textContent = "Request Sent";
                                connectButton.disabled = true;

                            });

                        });

                        matchResult.appendChild(memberCard);
                    });

                } else {

                    matchResult.textContent =
                        "No members found for " + item + ".";

                }

            });

            searchResult.appendChild(skillCard);
        });

    } else {

        searchResult.textContent =
            "No skills found for: " + skill;

    }

});


// =====================================
// Clear Skill Search
// =====================================

clearSearchButton.addEventListener("click", function() {

    skillInput.value = "";

    searchResult.innerHTML = "";
    matchResult.innerHTML = "";
    profileResult.innerHTML = "";

    skillInput.focus();
});


// =====================================
// Search Using Enter Key
// =====================================

skillInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchButton.click();
    }

});


// =====================================
// Share a Skill
// =====================================

submitSkillButton.addEventListener("click", function() {

    const name = nameInput.value.trim();
    const skill = skillShareInput.value.trim();
    const bio = bioInput.value.trim();

    if (name === "" || skill === "" || bio === "") {
        shareResult.textContent = "Please complete all fields.";
        shareResult.className = "error";
        return;
    }

    const duplicateMember = members.some(function(member) {
        return member.name.toLowerCase() === name.toLowerCase() &&
            member.skill.toLowerCase() === skill.toLowerCase();
    });

    if (duplicateMember) {
        shareResult.textContent =
            "This student has already shared this skill.";
        shareResult.className = "error";
        return;
}
    const newMember = {
        name: name,
        skill: skill,
        bio: bio
    };

    members.push(newMember);

    // Add the skill if it does not already exist.

    if (!skills.some(function(item) {
        return item.toLowerCase() === skill.toLowerCase();
    })) {
        skills.push(skill);
    }

    displaySkills();

    shareResult.textContent =
        "Your skill has been shared successfully!";

    shareResult.className = "success";

    nameInput.value = "";
    skillShareInput.value = "";
    bioInput.value = "";

    bioCounter.textContent = "0 / 200 characters";
});

clearShareSkillButton.addEventListener("click", function() {
    nameInput.value = "";
    skillShareInput.value = "";
    bioInput.value = "";

    bioCounter.textContent = "0 /200 characters";

    shareResult.textContent = "";
    shareResult.className = "";
});

// =====================================
// Bio Character Counter
// =====================================

bioInput.addEventListener("input", function() {

    bioCounter.textContent =
        bioInput.value.length + " / 200 characters";

});

// =====================================
// Footer Home Navigation
// =====================================

footerHomeButton.addEventListener("click", function(event) {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// =====================================
// Navigation Home Button
// =====================================

navHomeButton.addEventListener("click", function(event) {
    event.preventDefault();

    heroSection.style.display = "flex";

    heroSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
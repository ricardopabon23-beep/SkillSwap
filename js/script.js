// Escape user-provided content before displaying it as HTML
function escapeHTML(value) {
    const element = document.createElement("div");
    element.textContent = String(value ?? "");
    return element.innerHTML;
}

// Generate a password hash for prototype authentication.
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray.map(function(byte) {
        return byte.toString(16).padStart(2, "0");
    }).join("");
}

const profileCard = document.getElementById("profile-card");
const dashboardProfile = document.getElementById("dashboard-profile");
const mySkillsCard = document.getElementById("my-skills-card");
const myConnectionsCard = document.getElementById("my-connections-card");

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
const browseSkillsSearch = document.getElementById("browse-skills-search");
const skillsResultCount = document.getElementById("skills-result-count");
const skillsPrevButton = document.getElementById("skills-prev-btn");
const skillsNextButton = document.getElementById("skills-next-btn");
const skillsPageInfo = document.getElementById("skills-page-info");

// Pagination settings
const skillsPerPage = 6;
let currentSkillsPage = 1;

const skillMatchSection = document.getElementById("skill-match");
const exploreMatchesButton = document.getElementById("explore-matches-button");

const browseSkillsNav = document.getElementById("browse-skills-nav");
const footerBrowseSkills = document.getElementById("footer-browse-skills");
const dashboardNav = document.getElementById("dashboard-nav");
const navbarUserName = document.getElementById("navbar-user-name");

// Display the active user's profile name in the navigation bar.
// Fall back to the registered account name or the SkillSwap brand.
function updateNavbarUserName() {
    const activeUser = sessionStorage.getItem("skillswapActiveUser");

    const accounts = JSON.parse(
        localStorage.getItem("skillswapAccounts") || "[]"
    );

    const account = accounts.find(function(account) {
        return account.email === activeUser;
    });

    const savedProfile = activeUser
        ? JSON.parse(localStorage.getItem("skillswapProfile_" + activeUser) || "{}")
        : {};

    navbarUserName.textContent =
        activeUser && account
            ? (savedProfile.name || account.name)
            : "SkillSwap";
}

updateNavbarUserName();

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
const notificationBell = document.getElementById("notification-bell");
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
let isLoggedIn = sessionStorage.getItem("skillswapLoggedIn") === "true";
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

loginSubmitButton.addEventListener("click", async function() {

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

    // Check whether the email belongs to a registered account
    const matchingAccount = registeredAccounts.find(function (account) {
        return account.email === email.toLowerCase();
    });

    if (!matchingAccount) {
        loginResult.textContent = "No account found with this email address.";
        loginResult.className = "error";
        return;
    }

    // Check whether the account has a registered password
    if (!matchingAccount.passwordHash) {
        loginResult.textContent =
            "This account requires a password setup.";
        loginResult.className = "error";
        return;
    }

    // Verify the entered password against the stored hash
    const enteredPasswordHash = await hashPassword(password);

    if (enteredPasswordHash !== matchingAccount.passwordHash) {
        loginResult.textContent = "Incorrect password.";
        loginResult.className = "error";
        return;
    }

    loginResult.textContent = "Login information accepted.";
    loginResult.className = "success";

    isLoggedIn = true;
    sessionStorage.setItem("skillswapLoggedIn", "true");

    // Remember the active demonstration account
    sessionStorage.setItem("skillswapActiveUser", matchingAccount.email);

    // Load connections belonging to this account
    loadConnections();
    loadNotifications();
    updateNotificationCount();

    updateNavbarUserName();

    // Hide the login form and public hero section.
    loginSection.style.display = "none";
    heroSection.style.display = "none";
    
    // Update navigation controls for the authenticated user.
    loginButton.hidden = true;
    signupButton.hidden = true;
    logoutButton.hidden = false;
    notificationBell.hidden = false;

    // Update footer account links to reflect the logged-in state.
    footerLoginButton.hidden = true;
    footerSignupButton.hidden = true;
    footerLogoutButton.hidden = false;
    
    //Display the dashboard and account-only features.
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

    isLoggedIn = false;
    sessionStorage.removeItem("skillswapLoggedIn");

    // Clear the active user's session without deleting saved account data.
    sessionStorage.removeItem("skillswapActiveUser");

    window.location.reload();
});

// Reuse the main logout handler for the footer logout link.
footerLogoutButton.addEventListener("click", function(event) {
    event.preventDefault();
    logoutButton.click();
});

// Allow users to submit the login form by pressing Enter.
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

const savedProfile = sessionStorage.getItem("skillswapProfile");

if (savedProfile) {
    Object.assign(currentProfile, JSON.parse(savedProfile));
}

// =====================================
// Connection Storage for Active Account
// =====================================

function getConnectionStorageKey() {
    const activeUser =
        sessionStorage.getItem("skillswapActiveUser");

    return activeUser
        ? "skillswapConnections_" + activeUser
        : null;
}

// Connection data for the active account
let connections = [];

// Load connections for the currently logged-in account
function loadConnections() {
    const connectionStorageKey = getConnectionStorageKey();

    connections = connectionStorageKey
        ? JSON.parse(localStorage.getItem(connectionStorageKey) || "[]")
        : [];
}

// Restore saved connections when the page loads
loadConnections();

// =====================================
// Save Connections for Active Account
// =====================================

function saveConnections() {
    const connectionStorageKey = getConnectionStorageKey();

    if (!connectionStorageKey) {
        return;
    }

    localStorage.setItem(
        connectionStorageKey,
        JSON.stringify(connections)
    );
    
}

// =====================================
// Notification Request Section
// =====================================

// Store notifications loaded for the active account.
let acceptedRequestNotifications = [];

// Retrieve saved notifications from the active account's local storage.
function loadNotifications() {
    const activeUser = sessionStorage.getItem("skillswapActiveUser");

    // Clear notification data when no account is active.
    if (!activeUser) {
        acceptedRequestNotifications = [];
        return;
    }

    const notificationsStorageKey = "skillswapNotifications_" + activeUser;

    acceptedRequestNotifications = JSON.parse(
        localStorage.getItem(notificationsStorageKey) || "[]"
    );
}

// Restore saved notifications when the page loads
loadNotifications();

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
    window.location.href = "profile.html";
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
    window.location.href = "skills.html";
});


// =====================================
// Dashboard My Connections Card
// =====================================

myConnectionsCard.addEventListener("click", function() {
    window.location.href = "connections.html";
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
    window.location.href = "connections.html";
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
                window.location.href = "connections.html";
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
//  Navigation Notifications Bell
// =====================================

notificationBell.addEventListener("click", function() {
    window.location.href = "notifications.html";
});

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
                    
                    // Save the updated connection
                    saveConnections();


                    // Update the sender's outgoing request
                    if (connection.senderEmail) {
                        const senderStorageKey =
                            "skillswapConnections_" + connection.senderEmail;

                        const senderConnections = JSON.parse(
                            localStorage.getItem(senderStorageKey) || "[]"
                        );

                        const recipientEmail =
                            sessionStorage.getItem("skillswapActiveUser");

                        const outgoingRequest = senderConnections.find(function(request) {
                            return request.direction === "outgoing" &&
                                    request.recipientEmail === recipientEmail &&
                                    request.skill === connection.skill &&
                                    request.status === "pending";
                            });

                            if (outgoingRequest) {
                                outgoingRequest.status = "accepted";

                                localStorage.setItem(
                                    senderStorageKey,
                                    JSON.stringify(senderConnections)
                                );
                            }
                    }

                    updateNotificationCount();

                    window.location.href = "connections.html";

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

                    // Save the updated connections after declining
                    saveConnections();

                    updateNotificationCount();

                    window.location.href = "connections.html";

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

        sessionStorage.setItem("skillswapProfile", JSON.stringify(currentProfile));

        displayProfile();
    }

});

// =====================================
// Registered Accounts - Prototype
// =====================================

// Retrieve accounts previously created in this browser
const registeredAccounts = JSON.parse(
    localStorage.getItem("skillswapAccounts") || "[]"
);

// =====================================
// Create Account
// =====================================

createAccountButton.addEventListener("click", async function() {

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

    // Check whether the email is already registered
    const emailExists = registeredAccounts.some(function (account) {
        return account.email === email.trim().toLowerCase();
    });

    if (emailExists) {
        signupResult.textContent = "An account with this email already exists.";
        signupResult.className = "error";
    return;
    }

    // Generate the password hash
    const passwordHash = await hashPassword(password);

    // Save the new account
    const newAccount = {
        name: fullName,
        email: email.toLowerCase(),
        passwordHash: passwordHash
    };

    registeredAccounts.push(newAccount);

    localStorage.setItem(
        "skillswapAccounts",
        JSON.stringify(registeredAccounts)
    );

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

// =================================
// Load Registered Users' Skills
// =================================

function getRegisteredMembers() {
    const accounts = JSON.parse(
        localStorage.getItem("skillswapAccounts") || "[]"
    );

    const registeredMembers = [];

    accounts.forEach(function(account) {
        const profile = JSON.parse(
            localStorage.getItem("skillswapProfile_" + account.email) || "{}"
        );

        const teachingSkills =
            Array.isArray(profile.teachSkills) && profile.teachSkills.length > 0
                ? profile.teachSkills
                : profile.teachSkill
                    ? [profile.teachSkill]
                    : [];

        teachingSkills.forEach(function(skill) {
            registeredMembers.push({
                name: profile.name || account.name,
                email: account.email,
                skill: skill,
                learnSkill: profile.learnSkill || "",
                bio: profile.bio || ""
            });
        });
    });

    return registeredMembers;
}

// =====================================
// Reciprocal Skill Matching
// =====================================

// Determine whether two members can teach the skills each other wants to learn.
function isReciprocalMatch(member) {
    const activeUser = sessionStorage.getItem("skillswapActiveUser");

    // Exclude inactive sessions, demonstration members, and self-matches.
    if (!activeUser || !member.email || member.email === activeUser) {
        return false;
    }

    const profile = JSON.parse(
        localStorage.getItem("skillswapProfile_" + activeUser) || "{}"
    );

    // Normalize skill names for case-insensitive comparisons.
    const normalizeSkill = skill =>
        (skill || "").trim().toLowerCase();

    const teachingSkills =
        Array.isArray(profile.teachSkills) && profile.teachSkills.length > 0
            ? profile.teachSkills
            : profile.teachSkill
                ? [profile.teachSkill]
                : [];
    // Confirm that both members offer a skill the other wants to learn.
    return Boolean(
        normalizeSkill(profile.learnSkill) &&
        normalizeSkill(member.learnSkill) &&
        normalizeSkill(profile.learnSkill) === normalizeSkill(member.skill) &&
        teachingSkills.some(skill =>
            normalizeSkill(skill) === normalizeSkill(member.learnSkill)
        )
    );
}

// Combine predefined skills with registered users' teaching skills
const registeredSkills = getRegisteredMembers().map(member => member.skill);

registeredSkills.forEach(function(skill) {
    if (!skills.some(existing =>
        existing.toLowerCase() === skill.toLowerCase()
    )) {
        skills.push(skill);
    }
});

// =====================================
// Display Browse Skills
// =====================================

function displaySkills() {

    skillsContainer.innerHTML = "";

   // Filter and alphabetically sort available skills
    const searchTerm = browseSkillsSearch.value.trim().toLowerCase();

    const filteredSkills = [...skills]
        .filter(skill => skill.toLowerCase().includes(searchTerm))
        .sort((a, b) => a.localeCompare(b));

    // Calculate pagination
    const totalPages = Math.max(
        1,
        Math.ceil(filteredSkills.length / skillsPerPage)
    );

    currentSkillsPage = Math.max(
        1,
        Math.min(currentSkillsPage, totalPages)
    );

    const startIndex = (currentSkillsPage - 1) * skillsPerPage;

    const visibleSkills = filteredSkills.slice(
        startIndex,
        startIndex + skillsPerPage
    );

    // Update result count and pagination controls
        skillsResultCount.textContent =
        filteredSkills.length +
        (filteredSkills.length === 1 ? " skill found" : " skills found");

    skillsPageInfo.textContent =
        "Page " + currentSkillsPage + " of " + totalPages;

    skillsPrevButton.disabled = currentSkillsPage <= 1;
    skillsNextButton.disabled = currentSkillsPage >= totalPages;

    // Display a helpful message when no skills match
    if (filteredSkills.length === 0) {
        const emptyMessage = document.createElement("p");

        emptyMessage.classList.add("no-skills-message");
        emptyMessage.textContent =
            "No matching skills found. Try a different keyword.";

        skillsContainer.appendChild(emptyMessage);
        return;
    }

    // Create interactive skill cards for the current page of results.
    visibleSkills.forEach(function(skill) {

        const skillCard = document.createElement("button");
        skillCard.type = "button";

        skillCard.classList.add("browse-skill-card");
        skillCard.textContent = skill;

        // Open the skill search and automatically search for the selected skill.
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

// Filter skills as the user types
browseSkillsSearch.addEventListener("input", function() {
    currentSkillsPage = 1;
    displaySkills();
});

// Navigate to the previous page
skillsPrevButton.addEventListener("click", function() {
    currentSkillsPage--;
    displaySkills();
});

// Navigate to the next page
skillsNextButton.addEventListener("click", function() {
    currentSkillsPage++;
    displaySkills();
});


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

                // Combine demonstration members with registered users
                const allMembers = [...members, ...getRegisteredMembers()];

                // Find members who teach the selected skill
                const matchingMembers = allMembers.filter(function(member) {
                    const matchesSkill =
                        member.skill.toLowerCase() === item.toLowerCase();

                    const isCurrentUser =
                        member.email === sessionStorage.getItem("skillswapActiveUser");

                    return matchesSkill && !isCurrentUser;
                });

                if (matchingMembers.length > 0) {

                    matchResult.innerHTML =
                        "<h3>People who can help you learn " +
                        escapeHTML(item) +
                        "</h3>";

                    matchingMembers.forEach(function(member) {

                        const memberCard = document.createElement("div");

                        memberCard.classList.add("member-card");

                        memberCard.textContent =
                            member.name + " - " + member.skill;

                            // Display an indicator for reciprocal skill matches
                            if (isReciprocalMatch(member)) {
                                const matchBadge = document.createElement("span");

                                matchBadge.classList.add("mutual-match-badge");
                                matchBadge.textContent = "Mutual Skill Match";

                                memberCard.appendChild(matchBadge);
                            }

                        memberCard.addEventListener("click", function() {

                            profileResult.innerHTML =
                            "<div class='profile-picture'>👤</div>" +
                            "<h3>" + escapeHTML(member.name) + "</h3>" +
                            "<p class='profile-skill'>Skill: " +
                            escapeHTML(member.skill) + "</p>" +
                            "<p class='profile-bio'>" +
                            escapeHTML(member.bio) + "</p>" +
                            "<p class='profile-help'><strong>Can help you learn:</strong> " +
                            escapeHTML(member.skill) + "</p>" +
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

                                const recipientEmail = member.email;

                                connections.push({
                                    name: member.name,
                                    recipientEmail: recipientEmail,
                                    skill: member.skill,
                                    status: "pending",
                                    direction: "outgoing"
                                });

                                // Save the new connection request
                                saveConnections();

                                // Deliver the request to the registered recipient
                                if (recipientEmail) {
                                    const recipientStorageKey =
                                        "skillswapConnections_" + recipientEmail;

                                    const recipientConnections = JSON.parse(
                                        localStorage.getItem(recipientStorageKey) || "[]"
                                    );

                                    const senderEmail =
                                        sessionStorage.getItem("skillswapActiveUser");

                                    const senderProfile = JSON.parse(
                                        localStorage.getItem("skillswapProfile_" + senderEmail) || "{}"
                                    );

                                    recipientConnections.push({
                                        name: senderProfile.name || senderEmail,
                                        senderEmail: senderEmail,
                                        skill: member.skill,
                                        status: "pending",
                                        direction: "incoming"
                                    });

                                    localStorage.setItem(
                                        recipientStorageKey,
                                        JSON.stringify(recipientConnections)
                                    );
                                }

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

    // Identify the active account before saving a shared skill.
    const activeUser = sessionStorage.getItem("skillswapActiveUser");

    if (!isLoggedIn || !activeUser) {
        shareResult.textContent = "Please log in to share a skill.";
        shareResult.className = "error";
        return;
    }

    // Retrieve the active user's existing profile.
    const profileStorageKey = "skillswapProfile_" + activeUser;

    const savedProfile = JSON.parse(
        localStorage.getItem(profileStorageKey) || "{}"
    );

    // Validate all required fields before sharing a skill.
    if (name === "" || skill === "" || bio === "") {
        shareResult.textContent = "Please complete all fields.";
        shareResult.className = "error";
        return;
    }

    // Retrieve existing teaching skills while supporting older profiles.
    const teachingSkills = Array.isArray(savedProfile.teachSkills)
        ? [...savedProfile.teachSkills]
        : savedProfile.teachSkill
            ? [savedProfile.teachSkill]
            : [];

    // Prevent the active user from sharing the same skill twice.
    const duplicateMember = teachingSkills.some(function(existingSkill) {
        return existingSkill.toLowerCase() === skill.toLowerCase();
    });

    // Display an error if the skill already exists.
    if (duplicateMember) {
        shareResult.textContent =
            "This student has already shared this skill.";
        shareResult.className = "error";
        return;
    }
    // Add the new skill to the active user's teaching skills.
    teachingSkills.push(skill);

    // Update the saved profile while preserving existing information.
    const updatedProfile = {
        ...savedProfile,
        name: name,
        teachSkills: teachingSkills,
        bio: bio
    };

    // Save the updated profile permanently in browser storage.
    localStorage.setItem(
        profileStorageKey,
        JSON.stringify(updatedProfile)
    );

    // Synchronize the registered account name with the updated profile.
    const accounts = JSON.parse(
        localStorage.getItem("skillswapAccounts") || "[]"
    );

    const account = accounts.find(function(account) {
        return account.email === activeUser;
    });

    if (account) {
        account.name = updatedProfile.name;

        localStorage.setItem(
            "skillswapAccounts",
            JSON.stringify(accounts)
        );
    }

    // Refresh the name displayed in the navigation bar.
    updateNavbarUserName();

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

    bioCounter.textContent = "0 / 200 characters";

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

// =====================================
// Restore Login State
// =====================================

// Restore the authenticated interface after a page refresh
// or when returning from another SkillSwap page.
if (isLoggedIn) {
    heroSection.style.display = "none";
    loginSection.style.display = "none";
    signupSection.style.display = "none";

    loginButton.hidden = true;
    signupButton.hidden = true;
    logoutButton.hidden = false;
    notificationBell.hidden = false;

    footerLoginButton.hidden = true;
    footerSignupButton.hidden = true;
    footerLogoutButton.hidden = false;
    

    userDashboard.style.display = "block";

    browseSkillsSection.hidden = false;
    browseSkillsNav.hidden = false;
    footerBrowseSkills.hidden = false;
    dashboardNav.hidden = false;
    skillMatchSection.hidden = false;
}

// =====================================
// Authentication Navigation from Other Pages
// =====================================

// Open the appropriate authentication form when a logged-out
// visitor follows a login or registration link from another page.
if (!isLoggedIn) {

    if (window.location.hash === "#login-section") {

        loginButton.click();

    } else if (window.location.hash === "#signup-section") {

        signupButton.click();

    }

}
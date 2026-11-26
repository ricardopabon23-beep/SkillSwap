// ===============================
// Contact Form Elements
// ===============================

const contactForm = document.getElementById("contact-form");
const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const contactSubject = document.getElementById("contact-subject");
const contactMessage = document.getElementById("contact-message");
const contactResult = document.getElementById("contact-result");

// ===============================
// Contact Form Validation
// ===============================

contactForm.addEventListener("submit", function(event) {

    // Prevent the form from reloading the page
    event.preventDefault();

    // Retrieve and clean the entered values
    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const subject = contactSubject.value.trim();
    const message = contactMessage.value.trim();

    // Clear previous feedback
    contactResult.textContent = "";
    contactResult.className = "";

    // Validate required fields
    if (!name || !email || !subject || !message) {

        contactResult.textContent =
            "Please complete all required fields.";

        contactResult.className = "error";

        return;
    }

    // Validate email address format
    if (contactEmail.validity.typeMismatch) {

        contactResult.textContent =
            "Please enter a valid email address.";

        contactResult.className = "error";

        return;
    }

    // Display successful form validation feedback
    contactResult.textContent =
        "Your message passed validation. Message delivery is not yet available.";

    contactResult.className = "success";

});

// ===============================
// Account Navigation
// ===============================

const isLoggedIn =
    sessionStorage.getItem("skillswapLoggedIn") === "true";

const activeUser =
    sessionStorage.getItem("skillswapActiveUser");

const navbarUserName = document.getElementById("navbar-user-name");
const dashboardNav = document.getElementById("dashboard-nav");
const browseSkillsNav = document.getElementById("browse-skills-nav");
const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");
const logoutButton = document.getElementById("logout-button");
const notificationBell = document.getElementById("notification-bell");
const footerLoginButton = document.getElementById("footer-login-button");
const footerSignupButton = document.getElementById("footer-signup-button");
const footerLogoutButton = document.getElementById("footer-logout-button");
const footerBrowseSkills = document.getElementById("footer-browse-skills");

// Update navigation for logged-in members
if (isLoggedIn && activeUser) {

    const accounts = JSON.parse(
        localStorage.getItem("skillswapAccounts") || "[]"
    );

    const account = accounts.find(function(account) {
        return account.email === activeUser;
    });

    const savedProfile = JSON.parse(
        localStorage.getItem("skillswapProfile_" + activeUser) || "{}"
    );

    if (account) {

        navbarUserName.textContent =
            savedProfile.name || account.name;

        dashboardNav.hidden = false;
        browseSkillsNav.hidden = false;
        loginButton.hidden = true;
        signupButton.hidden = true;
        logoutButton.hidden = false;
        notificationBell.hidden = false;
        // Update footer account links
        footerLoginButton.hidden = true;
        footerSignupButton.hidden = true;
        footerLogoutButton.hidden = false;
        footerBrowseSkills.hidden = false;

    }

}

// Open the Notifications page
notificationBell.addEventListener("click", function() {

    if (isLoggedIn && activeUser) {
        window.location.href = "notifications.html";
    }

});

// ===============================
// Notification Counter
// ===============================

function updateNotificationCount() {

    if (!isLoggedIn || !activeUser) {
        return;
    }

    const notificationCount =
        document.getElementById("notification-count");

    // Retrieve connections for the active account
    const connections = JSON.parse(
        localStorage.getItem(
            "skillswapConnections_" + activeUser
        ) || "[]"
    );

    // Retrieve notifications for the active account
    const notifications = JSON.parse(
        localStorage.getItem(
            "skillswapNotifications_" + activeUser
        ) || "[]"
    );

    // Count pending incoming connection requests
    const pendingCount = connections.filter(function(connection) {
        return connection.status === "pending" &&
               connection.direction === "incoming";
    }).length;

    // Count unread notifications
    const unreadCount = notifications.filter(function(notification) {
        return notification.read === false;
    }).length;

    const totalNotifications = pendingCount + unreadCount;

    notificationCount.textContent = totalNotifications;
    notificationCount.hidden = totalNotifications === 0;
}

// Update the counter when the page loads
updateNotificationCount();

// ===============================
// Log Out Functionality
// ===============================

logoutButton.addEventListener("click", function(event) {

    event.preventDefault();

    // Clear the active login session
    sessionStorage.removeItem("skillswapLoggedIn");
    sessionStorage.removeItem("skillswapActiveUser");

    // Return to the homepage
    window.location.href = "index.html";

});

// Footer Log Out Functionality
footerLogoutButton.addEventListener("click", function(event) {

    event.preventDefault();

    // Reuse the main logout handler to avoid duplicating logout logic.
    logoutButton.click();

});
// Check Login and Identify the Active Account
const isNotificationsLoggedIn =
    sessionStorage.getItem("skillswapLoggedIn") === "true";

const activeNotificationsUser =
    sessionStorage.getItem("skillswapActiveUser");

// Redirect users who are not logged in
if (!isNotificationsLoggedIn || !activeNotificationsUser) {
    window.location.replace("index.html");
}

// Identify the Active Account's Notification Storage
const notificationsStorageKey =
    activeNotificationsUser
        ? "skillswapNotifications_" + activeNotificationsUser
        : null;

// Load Saved Notifications
let acceptedRequestNotifications = [];

if (isNotificationsLoggedIn && notificationsStorageKey) {
    acceptedRequestNotifications = JSON.parse(
        localStorage.getItem(notificationsStorageKey) || "[]"
    );
}

// Identify the Active Account's Connection Storage
const connectionsStorageKey =
    activeNotificationsUser
        ? "skillswapConnections_" + activeNotificationsUser
        : null;

// Load Saved Connections
let connections = [];

if (isNotificationsLoggedIn && connectionsStorageKey) {
    connections = JSON.parse(
        localStorage.getItem(connectionsStorageKey) || "[]"
    );
}

// Display Notifications
function displayNotifications() {
    const notificationsList =
        document.getElementById("notifications-list");

    // Find pending incoming connection requests
    const incomingRequests = connections.filter(function(connection) {
        return connection.status === "pending" &&
               connection.direction === "incoming";
    });

    // Find accepted connection notifications that are unread
    const unreadAcceptedNotifications =
        acceptedRequestNotifications.filter(function(notification) {
            return notification.read === false;
        });

    // Display a message when there are no notifications
    if (
        incomingRequests.length === 0 &&
        unreadAcceptedNotifications.length === 0
    ) {
        notificationsList.textContent = "No notifications yet.";
        return;
    }

    // Clear the notification list before displaying results
    notificationsList.innerHTML = "";

    // Display Incoming Connection Requests
    incomingRequests.forEach(function(connection) {
        const paragraph = document.createElement("p");

        paragraph.textContent =
            connection.name + " sent you a connection request.";

        // Create a button to view the request
        const viewRequest = document.createElement("button");

        viewRequest.type = "button";
        viewRequest.textContent = "Click to view request →";
        viewRequest.className = "notification-action";

        // Open My Connections when the button is clicked
        viewRequest.addEventListener("click", function() {
            window.location.href = "connections.html";
        });

        paragraph.appendChild(viewRequest);
        notificationsList.appendChild(paragraph);
    });

    // Display Accepted Connection Notifications
    unreadAcceptedNotifications.forEach(function(notification) {
        const paragraph = document.createElement("p");

        paragraph.textContent =
            notification.name + " accepted your connection request!";

        // Create a button to view the accepted connection
        const viewConnection = document.createElement("button");

        viewConnection.type = "button";
        viewConnection.textContent = "View connection →";
        viewConnection.className = "notification-action";

        // Open My Connections when the button is clicked
        viewConnection.addEventListener("click", function() {
            window.location.href = "connections.html";
        });

        paragraph.appendChild(viewConnection);

        // Create a button to mark the notification as read
        const markAsReadButton = document.createElement("button");

        markAsReadButton.type = "button";
        markAsReadButton.textContent = "Mark as Read";
        markAsReadButton.className = "notification-action";

        // Save the notification as read and refresh the list
        markAsReadButton.addEventListener("click", function() {
            notification.read = true;

            localStorage.setItem(
                notificationsStorageKey,
                JSON.stringify(acceptedRequestNotifications)
            );

            displayNotifications();
        });

        paragraph.appendChild(markAsReadButton);
        notificationsList.appendChild(paragraph);
    });
}

// Initialize Notifications After Login
if (isNotificationsLoggedIn && activeNotificationsUser) {
    displayNotifications();
}
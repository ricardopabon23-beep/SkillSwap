// SkillSwap - Messages Page

// Get the selected connection from the URL
const urlParams = new URLSearchParams(window.location.search);
const selectedUser = urlParams.get("user");
const selectedName = urlParams.get("name");

// Get messaging page elements
const messagingTitle = document.getElementById("messaging-title");
const messageForm = document.getElementById("message-form");

// Messaging interface elements
const messageInput = document.getElementById("message-input");
const messagesList = document.getElementById("messages-list");

// Identify the currently logged-in user
const activeUser = sessionStorage.getItem("skillswapActiveUser");
const isLoggedIn = sessionStorage.getItem("skillswapLoggedIn") === "true";

// Display the selected connection
if (selectedUser) {
    messagingTitle.textContent = "Conversation with " + (selectedName || selectedUser);
} else {
    messagingTitle.textContent = "Select a Conversation";
    messageForm.hidden = true;
}

// Prevent messaging when the user is not logged in
if (!isLoggedIn || !activeUser) {
    messagingTitle.textContent = "Login Required";
    messagesList.textContent = "Please log in to SkillSwap to send and receive messages.";
    messageForm.hidden = true;
}

// Handle message form submission
messageForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!isLoggedIn || !activeUser || !selectedUser) {
        return;
    }

    const messageText = messageInput.value.trim();

    if (!messageText) {
        return;
    }

    // Retrieve previously saved messages
    const savedMessages = JSON.parse(
        localStorage.getItem("skillswapMessages") || "[]"
    );

    // Create a new message
    const newMessage = {
        sender: activeUser,
        recipient: selectedUser,
        text: messageText,
        timestamp: new Date().toISOString()
    };

    // Add the new message to the conversation history
    savedMessages.push(newMessage);

    // Save the updated messages
    localStorage.setItem(
        "skillswapMessages",
        JSON.stringify(savedMessages)
    );

    // Retrieve the sender's profile information
    const senderProfile = JSON.parse(
        localStorage.getItem("skillswapProfile_" + activeUser) || "{}"
    );

    // Retrieve the recipient's existing notifications
    const recipientNotificationsKey =
        "skillswapNotifications_" + selectedUser;

    const recipientNotifications = JSON.parse(
        localStorage.getItem(recipientNotificationsKey) || "[]"
    );

    // Create a new unread message notification
    recipientNotifications.push({
        type: "message",
        name: senderProfile.name || activeUser,
        senderEmail: activeUser,
        timestamp: new Date().toISOString(),
        read: false
    });

    // Save the recipient's updated notifications
    localStorage.setItem(
        recipientNotificationsKey,
        JSON.stringify(recipientNotifications)
    );

    // Clear the message box
    messageInput.value = "";

    // Refresh the conversation after sending
    displayMessages();
});

// Display messages for the selected conversation
function displayMessages() {
    messagesList.innerHTML = "";

    if (!isLoggedIn || !activeUser || !selectedUser) {
        return;
    }

    const savedMessages = JSON.parse(
        localStorage.getItem("skillswapMessages") || "[]"
    );

    // Retrieve messages exchanged between the active user and selected member.
    const conversationMessages = savedMessages.filter(function(message) {
        return (
            (message.sender === activeUser && message.recipient === selectedUser) ||
            (message.sender === selectedUser && message.recipient === activeUser)
        );
    });

    if (conversationMessages.length === 0) {
        messagesList.textContent = "No messages yet. Start the conversation!";
        return;
    }

    conversationMessages.forEach(function(message) {
        const messageElement = document.createElement("p");

        const senderLabel = message.sender === activeUser ? "You" : (selectedName || selectedUser);

        messageElement.textContent = senderLabel + ": " + message.text;

        messagesList.appendChild(messageElement);
    });
}

// Load conversation history when the page opens
displayMessages();
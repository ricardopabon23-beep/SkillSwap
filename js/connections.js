
  // =============================================
  // Check Login and Identify the Active Account
  // =============================================
  // My Connections is available only to logged-in users.
  const isConnectionsLoggedIn =
      sessionStorage.getItem("skillswapLoggedIn") === "true";

  // Each account is identified by its email in session storage.
  const activeConnectionsUser =
      sessionStorage.getItem("skillswapActiveUser");

  if (!isConnectionsLoggedIn || !activeConnectionsUser) {
      window.location.replace("index.html");
  }

  // =============================================
  // Load Connections for the Active Account
  // =============================================
  // Different accounts have different localStorage keys.
  const connectionsStorageKey =
      "skillswapConnections_" + activeConnectionsUser;

  let connections = [];

  if (isConnectionsLoggedIn && activeConnectionsUser) {
      connections = JSON.parse(
          localStorage.getItem(connectionsStorageKey) || "[]"
      );
  }

  // This element contains the My Connections dashboard.
  const dashboardConnections =
      document.getElementById("dashboard-connections");

  // =============================================
  // Save the Current Account's Connections
  // =============================================
  function saveCurrentConnections() {
      localStorage.setItem(
          connectionsStorageKey,
          JSON.stringify(connections)
      );
  }

  // =============================================
  // Find the Sender's Matching Outgoing Request
  // =============================================
  // Newly created incoming requests include senderEmail.
  // Older requests without senderEmail cannot be synchronized reliably.
  function findSenderRequest(connection) {
      if (!connection.senderEmail) {
          return null;
      }

      const senderStorageKey =
          "skillswapConnections_" + connection.senderEmail;

      const senderConnections = JSON.parse(
          localStorage.getItem(senderStorageKey) || "[]"
      );

      const outgoingRequest = senderConnections.find(function(request) {
          return request.direction === "outgoing" &&
              request.recipientEmail === activeConnectionsUser &&
              request.skill === connection.skill &&
              request.status === "pending";
      });

      return {
          storageKey: senderStorageKey,
          connections: senderConnections,
          request: outgoingRequest
      };
  }

  // =============================================
  // Synchronize a Decision with the Sender
  // =============================================
  // Accepted requests become accepted for both accounts.
  // Declined requests are removed from the sender's pending list.
  function synchronizeSenderRequest(connection, accepted) {
      const senderRecord = findSenderRequest(connection);

      if (!senderRecord || !senderRecord.request) {
          return;
      }

      if (accepted) {
          senderRecord.request.status = "accepted";
      } else {
          const requestIndex = senderRecord.connections.indexOf(
              senderRecord.request
          );

          if (requestIndex !== -1) {
              senderRecord.connections.splice(requestIndex, 1);
          }
      }

      localStorage.setItem(
          senderRecord.storageKey,
          JSON.stringify(senderRecord.connections)
      );
  }

// Save a notification when a connection request is accepted.
function notifySenderOfAcceptance(connection) {
    // Only registered senders with an email can receive notifications.
    if (!connection.senderEmail) return;

    // Identify the sender's notification storage.
    const senderNotificationsKey =
        "skillswapNotifications_" + connection.senderEmail;

    // Load any notifications the sender already has.
    const senderNotifications = JSON.parse(
        localStorage.getItem(senderNotificationsKey) || "[]"
    );

    // Identify the person who accepted the request.
    const activeProfile = JSON.parse(
        localStorage.getItem(
            "skillswapProfile_" + activeConnectionsUser
        ) || "{}"
    );

    // Add a new unread acceptance notification.
    senderNotifications.push({
        name: activeProfile.name || activeConnectionsUser,
        skill: connection.skill,
        read: false
    });

    // Save the updated notification list.
    localStorage.setItem(
        senderNotificationsKey,
        JSON.stringify(senderNotifications)
    );
}

  // =============================================
  // Build the My Connections Page Sections
  // =============================================
  function displayConnections() {
      dashboardConnections.innerHTML = `
          <h3>My Connections</h3>

          <h4>Pending Requests</h4>
          <div id="pending-connections">
              <p>No pending requests.</p>
          </div>

          <h4>Accepted Connections</h4>
          <div id="accepted-connections">
              <p>No accepted connections yet.</p>
          </div>
      `;
  }

  // =============================================
  // Display Pending and Accepted Connections
  // =============================================
  function updateConnections() {
      const pendingContainer =
          document.getElementById("pending-connections");

      const acceptedContainer =
          document.getElementById("accepted-connections");

      // Show connections that have already been accepted.
      const acceptedConnections = connections.filter(function(connection) {
          return connection.status === "accepted";
      });

      if (acceptedConnections.length > 0) {
          acceptedContainer.innerHTML = "";

          acceptedConnections.forEach(function(connection) {
              const connectionItem = document.createElement("p");

              connectionItem.textContent =
                  connection.name + " — " +
                  connection.skill + " (Connected)";

              acceptedContainer.appendChild(connectionItem);
          });
      }

      // Show requests that are still awaiting a decision.
      const pendingConnections = connections.filter(function(connection) {
          return connection.status === "pending";
      });

      if (pendingConnections.length === 0) {
          return;
      }

      pendingContainer.innerHTML = "";

      pendingConnections.forEach(function(connection) {
          const connectionItem = document.createElement("p");
          const connectionActions = document.createElement("span");

          // Incoming requests can be accepted or declined.
          // Outgoing requests are displayed as Request Sent.
          const directionLabel =
              connection.direction === "incoming"
                  ? "Request Received"
                  : "Request Sent";

          connectionItem.textContent =
              connection.name + " — " +
              connection.skill + " (" + directionLabel + ")";

          if (connection.direction === "incoming") {
              // ---------------------------------------------
              // Accept an Incoming Connection Request
              // ---------------------------------------------
              const acceptButton = document.createElement("button");
              acceptButton.textContent = "Accept";
              acceptButton.className = "connection-accept-btn";

              acceptButton.addEventListener("click", function() {
                  // Accept and save the request in this account.
                  connection.status = "accepted";
                  saveCurrentConnections();

                  // Update the sender's matching outgoing request.
                  synchronizeSenderRequest(connection, true);

                  // Notify the sender that their connection request was accepted.
                  notifySenderOfAcceptance(connection);

                  // Refresh the page sections with the new status.
                  displayConnections();
                  updateConnections();
              });

              connectionActions.appendChild(acceptButton);

              // ---------------------------------------------
              //  Decline an Incoming Connection Request
              // ---------------------------------------------
              const declineButton = document.createElement("button");
              declineButton.textContent = "Decline";
              declineButton.className = "connection-decline-btn";

              declineButton.addEventListener("click", function() {
                  // Remove the incoming request from this account.
                  const connectionIndex = connections.indexOf(connection);

                  if (connectionIndex !== -1) {
                      connections.splice(connectionIndex, 1);
                  }

                  saveCurrentConnections();

                  // Remove the corresponding pending outgoing request.
                  synchronizeSenderRequest(connection, false);

                  // Refresh the page sections after declining.
                  displayConnections();
                  updateConnections();
              });

              connectionActions.appendChild(declineButton);
              connectionItem.appendChild(connectionActions);
          }

          pendingContainer.appendChild(connectionItem);
      });
  }

  // =============================================
  //  Initialize My Connections After Login
  // =============================================
  if (isConnectionsLoggedIn && activeConnectionsUser) {
      displayConnections();
      updateConnections();
  }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global Office */

Office.onReady(() => {
  // If needed, Office.js is ready to be called.
});

/**
 * Shows a notification when the add-in command is executed.
 * @param event
 */
function action(event: Office.AddinCommands.Event) {
  const message: Office.NotificationMessageDetails = {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: "Performed action.",
    icon: "Icon.80x80",
    persistent: true,
  };

  // Show a notification message.
  Office.context.mailbox.item?.notificationMessages.replaceAsync(
    "ActionPerformanceNotification",
    message
  );

  // Be sure to indicate when the add-in command function is complete.
  event.completed();
}

export function showDialog(event: Office.AddinCommands.Event) {
  Office.context.ui.displayDialogAsync(
    new URL("/dialog.html", window.location.origin).toString(),
    { height: 50, width: 50 },
    (result) => {
      const dialog = result.value;
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, (args) => {
        if("message" in args) console.log("Message from dialog:", args.message);
        else console.error(args.error);
      });
    }
  );
  event.completed();
}

Office.actions.associate("showDialog", showDialog);

// Register the function with Office.
Office.actions.associate("action", action);

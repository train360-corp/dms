import { app } from "electron";
import { resolve } from "node:path";



let deeplinkUrl = null;

// Register protocol handler
if (!app.isPackaged) {
  app.setAsDefaultProtocolClient("projdocs", process.execPath, [ resolve(process.argv[1]!) ]);
} else {
  app.setAsDefaultProtocolClient("projdocs");
}

// Ensure single instance (important for Windows)
const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", (event, argv) => {
    // Windows: deep link is passed as argument
    const deepLinkArg = argv.find(arg => arg.startsWith("projdocs://"));
    if (deepLinkArg) {
      deeplinkUrl = deepLinkArg;
      console.log("Deep link (second instance):", deeplinkUrl);
      // optionally route to a window here
    }
  });

  app.whenReady().then(() => {
    if (process.platform === "darwin") app.dock?.hide();

    // macOS: handle deep link when app is already running
    app.on("open-url", (event, url) => {
      event.preventDefault();
      deeplinkUrl = url;
      console.log("Deep link (macOS):", deeplinkUrl);
      // optionally route to a window here
    });

    // Check for deep link on initial launch
    if (process.platform === "win32") {
      const deepLinkArg = process.argv.find(arg => arg.startsWith("projdocs://"));
      if (deepLinkArg) {
        deeplinkUrl = deepLinkArg;
        console.log("Deep link (initial Windows launch):", deeplinkUrl);
        // optionally route to a window here
      }
    }

    console.log("Hello from Electron 👋");
  });
}
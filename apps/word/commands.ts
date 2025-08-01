/// <reference types="office-js" />

type Action = (event?: {
  completed?: () => void;
}) => Promise<void>;

Office.onReady()
  .then(() => {
    console.log("Office is ready");
    Office.actions.associate("save", save);
    Office.actions.associate("saveAsNewVersion", saveAsNewVersion);
    Office.actions.associate("saveAsNewFile", saveAsNewFile);
  })
  .catch((e) => {
    console.error("Office.onReady failed:", e);
  });

const __open = async (target: string) =>
  await new Promise((resolve) => {
    Office.context.ui.displayDialogAsync(
      new URL(`/index.html?target=${target}`, window.location.origin).toString(),
      { height: 40, width: 30 },
      (result) => {
        const dialog: Office.Dialog = result.value;
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
          if(arg && "message" in arg) {
            switch (arg.message) {
              case "CLOSE":
                dialog.close();
                resolve("closed");
                break;
            }
          }
        });
      }
    );
  });


const save: Action = async (event) => {
  console.log("✅ save() was called");
  await __open("save");
  if (event !== undefined && "completed" in event && event.completed !== undefined) event.completed();
  return Promise.resolve();
};

const saveAsNewVersion: Action = async (event) => {
  console.log("✅ saveAsNewVersion() was called");
  await __open("save-as-new-version");
  if (event !== undefined && "completed" in event && event.completed !== undefined) event.completed();
  return Promise.resolve();
};

const saveAsNewFile: Action = async (event) => {
  console.log("✅ saveAsNewFile() was called");
  await __open("save-as-new-file");
  if (event !== undefined && "completed" in event && event.completed !== undefined) event.completed();
  return Promise.resolve();
};
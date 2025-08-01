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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const __open = async (target: string) => {
  await new Promise((resolve, reject) => {
    Office.context.ui.displayDialogAsync(
      new URL(`/index.html?target=${target}`, window.location.origin).toString(),
      { height: 40, width: 30 },
      (result) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          // const dialog = result.value;
          // setTimeout(() => dialog.close(), 3000);
          resolve("closed");
        } else {
          reject(result.error);
        }
      }
    );
  });
  await sleep(10000);
}

const save: Action = async (event) => {
  console.log("✅ save() was called");
  await __open("save");
  if (event !== undefined && "completed" in event && event.completed !== undefined) event.completed();
  return Promise.resolve();
}

const saveAsNewVersion: Action = async (event) => {
  console.log("✅ saveAsNewVersion() was called");
  await __open("save-as-new-version");
  if (event !== undefined && "completed" in event && event.completed !== undefined) event.completed();
  return Promise.resolve();
}

const saveAsNewFile: Action = async (event) => {
  console.log("✅ saveAsNewFile() was called");
  await __open("save-as-new-file");
  if (event !== undefined && "completed" in event && event.completed !== undefined) event.completed();
  return Promise.resolve();
}
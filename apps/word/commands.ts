/// <reference types="office-js" />

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

function save(): Promise<void> {
  console.log("✅ save() was called");
  window.location.href = "projdocs://app/1";
  return Promise.resolve();
}

function saveAsNewVersion(): Promise<void> {
  console.log("✅ saveAsNewVersion() was called");
  window.location.href = "projdocs://app/2";
  return Promise.resolve();
}

function saveAsNewFile(): Promise<void> {
  console.log("✅ saveAsNewFile() was called");
  window.location.href = "projdocs://app/3";
  return Promise.resolve();
}
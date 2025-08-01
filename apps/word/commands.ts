/// <reference types="office-js" />



Office.onReady().then(() => {
  console.log("Office is ready");

  // Register command callbacks by name
  Office.actions.associate("save", save);
  Office.actions.associate("saveAsNewVersion", saveAsNewVersion);
  Office.actions.associate("saveAsNewFile", saveAsNewFile);
}).catch(e => {
  console.error(e);
});

function save() {
  console.log("✅ save() was called");
  return Promise.resolve();
}

function saveAsNewVersion() {
  console.log("✅ saveAsNewVersion() was called");
  return Promise.resolve();
}

function saveAsNewFile() {
  console.log("✅ saveAsNewFile() was called");
  return Promise.resolve();
}
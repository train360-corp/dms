Office.onReady(() => {
  console.log("Office is ready");
});

export function save() {
  window.location.href = "projdocs://app/1";
}

export function saveAsNewVersion() {
  window.location.href = "projdocs://app/2";
}

export function saveAsNewFile() {
  window.location.href = "projdocs://app/3";
}
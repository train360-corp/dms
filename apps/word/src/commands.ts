Office.onReady(() => {
  console.log("Office is ready");
});

export function openProjDocs1() {
  window.location.href = "projdocs://app/1";
}

export function openProjDocs2() {
  window.location.href = "projdocs://app/2";
}

export function openProjDocs3() {
  window.location.href = "projdocs://app/3";
}
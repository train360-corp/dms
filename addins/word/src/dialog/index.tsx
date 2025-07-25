import React from "react";
import { createRoot } from "react-dom/client";



Office.onReady(() => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<Dialog/>);
});

function Dialog() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Hello from Dialog</h1>
      <button
        onClick={() => {
          Office.context.ui.messageParent("Dialog button clicked!");
        }}
      >
        Notify Parent
      </button>
    </div>
  );
}
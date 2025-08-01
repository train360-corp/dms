import { useEffect } from "react";

function App() {
  useEffect(() => {
    Office.onReady(() => {
      console.log("Office.js is ready");
    });
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>ProjDocs Word Add-in</h1>
      <p>This add-in injects buttons into the Word ribbon to launch your local app via <code>projdocs://</code>.</p>
    </div>
  );
}

export default App;
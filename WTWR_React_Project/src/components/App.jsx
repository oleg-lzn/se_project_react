import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <p
        style={{
          fontFamily: "CabinetGrotesk",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "20px",
        }}
      >
        Testing Paragraph
      </p>
      <h1
        style={{
          fontFamily: "CabinetGrotesk",
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: "24px",
        }}
      >
        Testing Heading
      </h1>
      <h2
        style={{
          fontFamily: "CabinetGrotesk",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "20px",
        }}
      >
        Testing Heading
      </h2>
    </>
  );
}

export default App;

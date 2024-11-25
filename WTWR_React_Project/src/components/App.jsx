import { useState } from "react";
import "./App.css";
import Header from "../components/App/Header/Header.jsx";
import Footer from "./App/Footer/Footer.jsx";

function App() {
  return (
    <div className="app">
      <div className="app__wrapper">
        <Header />
        <Footer />
      </div>
    </div>
  );
}

export default App;

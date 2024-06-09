import Navbar from "./Componentes/Navbar/Navbar";
import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome to My React App</h1>
        <p>This is a simple example of a React app using Materialize CSS.</p>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import GamePage from "./pages/GamePage";

import './App.css';
import Header from "./components/Header";


function App() {

  return (
    <div className="App">
      <Header onSearch={(text) => console.log(text)} />
      <GamePage />
    </div>
  );
}

export default App;
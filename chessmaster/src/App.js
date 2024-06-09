import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import GamePage from "./pages/GamePage";

import './App.css';

function App() {

  return (
    <div className="App">
      <Header onSearch={(text) => console.log(text)} />
      
      <BrowserRouter>
        <Routes>
          <Route path="/games/:gameid" element={<GamePage />} />
          
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//<Route path="/" element={<MainPage />} />
//<Route path="/users/:userid" element={<UserPage />} />
export default App;
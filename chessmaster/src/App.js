import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import GamePage from "./pages/GamePage";
import UserPage from "./pages/UserPage";

import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header onSearch={(text) => console.log(text)} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/games/:gameid" element={<GamePage />} />
          <Route path="/users/:username" element={<UserPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
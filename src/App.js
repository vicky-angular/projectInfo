import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HistoryList } from "./components/History/HistoryList";
import { Projects } from "./components/Projects/Projects";
import { AppBarDrawe } from "./components/AppBar/AppBarDrawe";

function App() {
 
  return (
    <Router>
    <Routes>
      <Route path="/history" element={<HistoryList />} />
      <Route path="/projects" element={<AppBarDrawe />} />
      <Route path="/" element={<AppBarDrawe />} />
    </Routes>
  </Router>
  );
}

export default App;

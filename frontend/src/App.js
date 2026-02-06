import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlantList from './PlantList';
import PlantDetails from './PlantDetails';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">PlantMasterPro</a>
        </nav>
        <Routes>
          <Route path="/" element={<PlantList />} />
          <Route path="/plants/:id" element={<PlantDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
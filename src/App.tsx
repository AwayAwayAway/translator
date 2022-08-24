import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ApplicationLayout from './pages/ApplicationLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/translator" />} />
        <Route path="/" element={<ApplicationLayout />}>
          <Route path="/translator" element={<div>Translator Page</div>} />
          <Route path="/favourites" element={<div>Favourite Page</div>} />
          <Route path="*" element={<div>404 Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

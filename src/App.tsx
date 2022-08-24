import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ApplicationLayout from './pages/ApplicationLayout';
import TranslatorPage from './pages/translator/TranslatorPage';
import FavouriteTranslationPage from './pages/favourites/FavouriteTranslationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/translator" />} />
        <Route path="/" element={<ApplicationLayout />}>
          <Route path="/translator" element={<TranslatorPage />} />
          <Route path="/favourites" element={<FavouriteTranslationPage />} />
          <Route path="*" element={<div>404 Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

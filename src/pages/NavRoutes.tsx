import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CarDetailsPage from './CarDetailsPage';
import ArticleDetailsPage from './ArticleDetailsPage';
import VideoDetailsPage from './VideoDetailsPage';
import PhotoDetailsPage from './PhotoDetailsPage';
import GaragePage from './GaragePage';
import BuyersGuide from './BuyersGuide';
import DesignSystem from './DesignSystem';

const NavRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarDetailsPage />} />
        <Route path="/article/:id" element={<ArticleDetailsPage />} />
        <Route path="/video/:id" element={<VideoDetailsPage />} />
        <Route path="/photo/:id" element={<PhotoDetailsPage />} />
        <Route path="/garage" element={<GaragePage />} />
        <Route path="/buyers-guide" element={<BuyersGuide />} />
        <Route path="/design-system" element={<DesignSystem />} />
      </Routes>
    </Router>
  );
};

export default NavRoutes;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './Index';
import NewCarDetail from './NewCarDetail';
import ArticleDetail from './ArticleDetail';
import VideoDetail from './VideoDetail';
import PhotoDetail from './PhotoDetail';
import Garage from './Garage';
import BuyersGuide from './BuyersGuide';
import DesignSystem from './DesignSystem';
import CarComparison from './CarComparison';

const NavRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/car/:id" element={<NewCarDetail />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/photo/:id" element={<PhotoDetail />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/buyers-guide" element={<BuyersGuide />} />
        <Route path="/compare" element={<CarComparison />} />
        <Route path="/design-system" element={<DesignSystem />} />
      </Routes>
    </Router>
  );
};

export default NavRoutes;

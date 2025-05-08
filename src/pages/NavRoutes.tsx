
import React from "react";

interface NavRouteProps {
  path: string;
  title: string;
}

const NavRoutes: React.FC<NavRouteProps> = ({ path, title }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-motortrend-gray">
      <h1 className="text-3xl font-bold text-motortrend-dark mb-4">{title}</h1>
      <p className="text-lg text-gray-600">This page is under construction.</p>
      <a 
        href="/"
        className="mt-6 bg-motortrend-dark text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
      >
        Back to Home
      </a>
    </div>
  );
};

export default NavRoutes;

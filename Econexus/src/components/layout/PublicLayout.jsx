import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import '../../pages/public/LandingPage.css';
import '../../pages/public/ServiciosPage.css';

const PublicLayout = () => {
  return (
    <div className="public-layout d-flex flex-column min-vh-100 w-100 flex-grow-1">
      <PublicHeader />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;

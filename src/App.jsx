// src/App.jsx
import React, { useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LoginSuccessPage from './pages/LoginSuccessPage.jsx';
import GridContentPage from './pages/GridContentPage.jsx';
import Navbar from './components/Navbar.jsx';
import SideNav from './components/SideNav.jsx';

// (Keep the GRID_DATA here or move it to a separate data.js file if it gets larger)
const GRID_DATA = [
  { id: 1, name: "Product A", description: "High-quality product with excellent features.", image: "https://placehold.co/100x100/A78BFA/ffffff?text=ProdA" },
  { id: 2, name: "Service B", description: "Reliable and efficient service tailored for your needs.", image: "https://placehold.co/100x100/60A5FA/ffffff?text=ServB" },
  { id: 3, name: "Solution C", description: "Innovative solution to complex problems.", image: "https://placehold.co/100x100/34D399/ffffff?text=SoluC" },
  { id: 4, name: "Item D", description: "Durable and stylish, a perfect addition.", image: "https://placehold.co/100x100/FACC15/ffffff?text=ItemD" },
  { id: 5, name: "Gadget E", description: "Cutting-edge technology for modern living.", image: "https://placehold.co/100x100/FB923C/ffffff?text=GadgE" },
  { id: 6, name: "Software F", description: "Boost your productivity with our intuitive software.", image: "https://placehold.co/100x100/EF4444/ffffff?text=SoftF" },
];


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const goToLogin = () => {
    setCurrentPage('login');
    setIsSideNavOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('success');
  };

  const handleOkAndOpenSideNav = () => {
    setIsSideNavOpen(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    setIsSideNavOpen(false);
  };

  const goToGridContent = () => {
    setCurrentPage('grid');
  };

  const goToHome = () => {
    setCurrentPage('home');
  };

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center p-4 font-sans antialiased">
      <Navbar
        currentPage={currentPage}
        isAuthenticated={isAuthenticated}
        onGoToLogin={goToLogin}
        onLogout={handleLogout}
        onToggleSideNav={toggleSideNav}
        onGoToHome={goToHome}
      />

      {isAuthenticated && (
        <SideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} onNavigateToGridContent={goToGridContent} />
      )}

      <div className="flex-grow flex items-center justify-center w-full">
        {(() => {
          switch (currentPage) {
            case 'home':
              return <HomePage onGoToLogin={goToLogin} />;
            case 'login':
              return <LoginPage onLoginSuccess={handleLoginSuccess} onGoToHome={handleLogout} />;
            case 'success':
              return <LoginSuccessPage onOpenSideNavAndNavigate={handleOkAndOpenSideNav} />;
            case 'grid':
              return <GridContentPage />;
            default:
              return <HomePage onGoToLogin={goToLogin} />;
          }
        })()}
      </div>
    </div>
  );
}

export default App;
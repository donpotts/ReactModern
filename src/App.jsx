// App.jsx
// This React application demonstrates a multi-page flow:
// Home -> Login -> Logged-in Success -> Home.
// It includes a top navigation bar, a side navigation menu with a hamburger icon
// (visible when logged in), and modern content cards on the home page.
// It features a "View Grid Items" link in the side nav that leads to a
// new page displaying a grid of items from a hardcoded JSON response,
// with the side menu retracting after navigation.
// The "My Modern App" title in the navbar is a link to the home page,
// preserving the side menu's open state if logged in.
// It uses Tailwind CSS for styling, focusing on a clean, modern aesthetic.

import React, { useState } from 'react';

// --- Hardcoded JSON data for the grid ---
const GRID_DATA = [
  {
    id: 1,
    name: "Product A",
    description: "High-quality product with excellent features.",
    image: "https://placehold.co/100x100/A78BFA/ffffff?text=ProdA" // Placeholder image
  },
  {
    id: 2,
    name: "Service B",
    description: "Reliable and efficient service tailored for your needs.",
    image: "https://placehold.co/100x100/60A5FA/ffffff?text=ServB" // Placeholder image
  },
  {
    id: 3,
    name: "Solution C",
    description: "Innovative solution to complex problems.",
    image: "https://placehold.co/100x100/34D399/ffffff?text=SoluC" // Placeholder image
  },
  {
    id: 4,
    name: "Item D",
    description: "Durable and stylish, a perfect addition.",
    image: "https://placehold.co/100x100/FACC15/ffffff?text=ItemD" // Placeholder image
  },
  {
    id: 5,
    name: "Gadget E",
    description: "Cutting-edge technology for modern living.",
    image: "https://placehold.co/100x100/FB923C/ffffff?text=GadgE" // Placeholder image
  },
  {
    id: 6,
    name: "Software F",
    description: "Boost your productivity with our intuitive software.",
    image: "https://placehold.co/100x100/EF4444/ffffff?text=SoftF" // Placeholder image
  },
];


// --- SideNav Component ---
// This component represents the collapsible side navigation menu.
function SideNav({ isOpen, onClose, onNavigateToGridContent }) {
  const handleGridClick = () => {
    onNavigateToGridContent(); // Navigate to the grid page
    onClose(); // Close the side menu
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        ></div>
      )}

      {/* Side Navigation Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-xl z-30 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 text-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-indigo-300">Menu</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav className="space-y-4">
            <button
              onClick={handleGridClick} // Call the new combined handler
              className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded-lg w-full text-left transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-3"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.5 9.5a3 3 0 0 0 4.24 4.24l1.41-1.41"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07L14.5 14.5a3 3 0 0 0-4.24-4.24l-1.41 1.41"></path>
              </svg>
              View Grid Items
            </button>
            {/* Add more links here */}
          </nav>
        </div>
      </div>
    </>
  );
}

// --- Navbar Component ---
// This component provides the top navigation bar with dynamic login/logout button and hamburger.
function Navbar({ currentPage, isAuthenticated, onGoToLogin, onLogout, onToggleSideNav, onGoToHome }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-gray-800 bg-opacity-90 backdrop-blur-sm shadow-lg p-4 flex justify-between items-center text-white">
      <div className="flex items-center">
        {/* Hamburger menu icon: visible when authenticated AND on 'home' OR 'grid' pages */}
        {isAuthenticated && (currentPage === 'home' || currentPage === 'grid') && (
          <button
            onClick={onToggleSideNav}
            className="mr-4 text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        {/* App Title as a clickable button to go to Home */}
        <button
          onClick={onGoToHome} // New prop for navigating to home
          className="text-2xl font-bold tracking-wide text-indigo-300 focus:outline-none" // Add focus outline for accessibility
          aria-label="Go to Home Page"
        >
          My Modern App
        </button>
      </div>
      <div>
        {!isAuthenticated ? ( // Show Login button if not authenticated
          currentPage !== 'login' && ( // Don't show if already on login page
            <button
              onClick={onGoToLogin}
              className="px-5 py-2 bg-indigo-600 rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform active:scale-95"
            >
              Login
            </button>
          )
        ) : ( // Show Logout button if authenticated
          <button
            onClick={onLogout}
            className="px-5 py-2 bg-red-500 rounded-lg font-semibold shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform active:scale-95"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

// --- ContentCard Component ---
// A reusable component for displaying modern content cards.
function ContentCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="text-4xl text-indigo-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// --- HomePage Component ---
// This is the initial page with modern cards for content.
function HomePage({ onGoToLogin }) {
  return (
    <div className="pt-24 pb-8 w-full max-w-4xl px-4 animate-fade-in"> {/* Added padding top to account for navbar */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-white mb-4">Discover Our Features</h2>
        <p className="text-lg text-indigo-100">Explore what our powerful application can do for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ContentCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
          }
          title="Intuitive Design"
          description="Enjoy a sleek and user-friendly interface designed for optimal experience."
        />
        <ContentCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
              <path d="M17 2L12 7L7 2"></path>
            </svg>
          }
          title="Powerful Features"
          description="Unlock a suite of advanced tools tailored to boost your productivity."
        />
        <ContentCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          }
          title="Dedicated Support"
          description="Our team is here to assist you with any questions or challenges you face."
        />
      </div>
       <div className="mt-12 text-center">
        <button
          onClick={onGoToLogin}
          className="px-8 py-4 bg-purple-700 text-white rounded-lg font-semibold text-xl shadow-xl hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform active:scale-95"
        >
          Get Started Now!
        </button>
      </div>
    </div>
  );
}

// --- LoginPage Component ---
// This component contains the user authentication form.
function LoginPage({ onLoginSuccess, onGoToHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handles the sign-in button click.
  const handleSignIn = (e) => {
    e.preventDefault();
    // Simulate authentication
    if (email === 'user@example.com' && password === 'password123') {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        onLoginSuccess(); // Navigate to success page after a short delay
      }, 500);
    } else {
      setMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="pt-24 bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full transform transition-all duration-300 hover:scale-105 animate-fade-in">
      <div className="flex flex-col items-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-indigo-500 mb-3 transform scale-125 transition-transform duration-300 ease-in-out"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Login</h2>
        <p className="text-gray-500 text-center">Enter your credentials to continue.</p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
            placeholder="user@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
            placeholder="password123"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform active:scale-95"
        >
          Sign In
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={onGoToHome}
          className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

// --- LoginSuccessPage Component ---
// This page is shown after a successful login, now with an "OK" button to open the side menu.
function LoginSuccessPage({ onOpenSideNavAndNavigate }) {
  return (
    <div className="pt-24 bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center flex flex-col items-center justify-center animate-fade-in">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-500 mb-4 transform scale-125 transition-transform duration-300 ease-in-out"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Login Successful!</h2>
      <p className="text-gray-600 mb-6">Welcome to your personalized dashboard.</p>
      <button
        onClick={onOpenSideNavAndNavigate}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform active:scale-95"
      >
        OK
      </button>
    </div>
  );
}

// --- GridContentPage Component ---
// This new page displays items from hardcoded JSON data in a grid.
function GridContentPage() {
  return (
    <div className="pt-24 pb-8 w-full max-w-4xl px-4 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-white mb-4">Explore Our Collection</h2>
        <p className="text-lg text-indigo-100">A showcase of various items available.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {GRID_DATA.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-full object-cover mb-4 shadow-md"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/CCCCCC/000000?text=Error`; }} // Fallback for image error
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


// --- Main App Component ---
// Manages the overall application state and renders the appropriate page.
function App() {
  // 'currentPage' state determines which component to render: 'home', 'login', 'success', or 'grid'
  const [currentPage, setCurrentPage] = useState('home'); // Start at the home page
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to control the visibility of the side navigation menu
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Navigation functions to update the current page
  const goToLogin = () => {
    setCurrentPage('login');
    setIsSideNavOpen(false); // Close side nav if navigating to login
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set authentication status to true
    setCurrentPage('success');
  };

  // Combined handler for "OK" button on success page
  const handleOkAndOpenSideNav = () => {
    setIsSideNavOpen(true); // Open the side nav
    setCurrentPage('home'); // Navigate to the home page, making the success card disappear
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Set authentication status to false
    setCurrentPage('home'); // Logout returns to home page
    setIsSideNavOpen(false); // Close side nav on logout
  };

  // Function to navigate to the Grid Content Page
  const goToGridContent = () => {
    setCurrentPage('grid');
    // Removed setIsSideNavOpen(false); here to keep the side nav open
  };

  // Function to navigate to the Home Page (from navbar)
  const goToHome = () => {
    setCurrentPage('home');
    // We do NOT set setIsSideNavOpen(false) here,
    // so the side menu's state is preserved if it's open.
  };


  // Function to toggle the side navigation menu
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    // Main container with full height and centering
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center p-4 font-sans antialiased">
      {/* Render the Navbar at the top */}
      <Navbar
        currentPage={currentPage}
        isAuthenticated={isAuthenticated} // Pass isAuthenticated to Navbar
        onGoToLogin={goToLogin}
        onLogout={handleLogout}
        onToggleSideNav={toggleSideNav} // Pass toggle function to Navbar
        onGoToHome={goToHome} // Pass new goToHome function to Navbar
      />

      {/* Render the Side Navigation menu */}
      {/* The side nav is only relevant when authenticated */}
      {isAuthenticated && (
        <SideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} onNavigateToGridContent={goToGridContent} />
      )}

      {/* Main content area, centered */}
      <div className="flex-grow flex items-center justify-center w-full">
        {/* Conditional rendering based on the 'currentPage' state */}
        {(() => {
          switch (currentPage) {
            case 'home':
              return <HomePage onGoToLogin={goToLogin} />;
            case 'login':
              return <LoginPage onLoginSuccess={handleLoginSuccess} onGoToHome={handleLogout} />;
            case 'success':
              // Pass the new combined handler to LoginSuccessPage
              return <LoginSuccessPage onOpenSideNavAndNavigate={handleOkAndOpenSideNav} />;
            case 'grid':
              return <GridContentPage />;
            default:
              return <HomePage onGoToLogin={goToLogin} />; // Fallback to home
          }
        })()}
      </div>
    </div>
  );
}

export default App;

// src/pages/LoginPage.jsx
import React, { useState } from 'react';

function LoginPage({ onLoginSuccess, onGoToHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email === 'user@example.com' && password === 'password123') {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        onLoginSuccess();
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

export default LoginPage;
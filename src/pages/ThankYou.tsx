
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center animate-fade-in">
        <div className="w-16 h-16 bg-brand-primary rounded-full mx-auto flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Purchase!</h1>
        
        <p className="text-gray-600 mb-6">
          Your personalized Well-being Management Plan is now being prepared. You'll receive an email with your plan and access details shortly.
        </p>
        
        <div className="bg-brand-light p-4 rounded-lg mb-6">
          <p className="font-medium">What happens next?</p>
          <ul className="text-left text-sm mt-2 space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary mr-2 mt-1">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>You'll receive an email with your personalized plan within the next 15 minutes.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary mr-2 mt-1">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Our team of experts will review your answers and provide additional insights.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary mr-2 mt-1">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>You'll gain access to our mobile app where you can track your progress.</span>
            </li>
          </ul>
        </div>
        
        <Link to="/" className="block w-full bg-brand-primary hover:bg-green-600 text-white font-medium py-3 px-4 rounded-full transition-all shadow-md">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;

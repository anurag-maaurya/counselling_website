import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  // State to manage the mobile menu open/close status
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function for the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Dropdown menu content
  const dropdownItems = [
    'JOSAA & CSAB 2025', 'AKTU/UPTU 2025', 'CUET BTECH 2025', 
    'JAC DELHI 2025', 'WBJEE 2025', 'GGSIPU 2025', 
    'MPDTE 2025', 'Reap Rajasthan 2025', 'COMEDK 2025', 'HSTES 2025'
  ];

  // Base link styles updated for dark theme
  const baseLinkClasses = "text-gray-300 hover:text-orange-500 transition duration-300";
  const mobileLinkClasses = "block px-4 py-3 text-lg border-b border-gray-700 text-gray-200 hover:bg-neutral-700";

  return (
    // Background and border updated for dark theme
    <header className="bg-neutral-900 shadow-xl sticky top-0 z-40 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        
        {/* Left - Logo / Name (Professional & Bold - text is now white/light) */}
        <Link to="/" className="flex items-center space-x-3 transition duration-300 transform hover:scale-[1.01]">
          <div className="w-8 h-8 bg-orange-600 rounded-lg shadow-md transform rotate-45"></div>
          <span className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            STBG <span className="text-orange-500">Academy</span>
          </span>
        </Link>

        {/* --- DESKTOP NAVIGATION (Hidden on Mobile) --- */}
        <nav className="hidden lg:flex items-center space-x-8 text-lg font-medium">
          
          <Link to="/home" className={baseLinkClasses}>
            Home
          </Link>

          {/* Professional Dropdown Menu */}
          <div className="relative group inline-block">
            <a 
              href="#" 
              className={`${baseLinkClasses} cursor-pointer flex items-center`}
            >
              Counselling
              {/* Subtle down arrow icon */}
              <span className="ml-1 text-sm text-orange-500">&#9662;</span> 
            </a>

            {/* Dropdown Menu Content - Background and shadow updated */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-64 bg-neutral-800 border border-gray-700 rounded-lg shadow-2xl 
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20 overflow-hidden"
            >
              <div className="p-2">
                {dropdownItems.map((item, index) => (
                  <a 
                    key={index} 
                    href="#a" 
                    // Dropdown item hover background updated for dark theme
                    className="block px-4 py-2 text-gray-200 text-base font-normal hover:bg-orange-500/20 hover:text-orange-400 transition rounded-md"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <a href="#f" className={baseLinkClasses}>
            Contact Us
          </a>

          {/* Login Buttons - Remain bright for high visibility */}
          <div className="space-x-3 ml-8">
            <Link
              to="/login"
              className="px-5 py-2 border border-orange-500 text-orange-400 rounded-full hover:bg-orange-900/40 transition duration-300 font-semibold text-base"
            >
              Student Login
            </Link>
            <Link
              to="/M"
              className="px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition duration-300 font-semibold shadow-lg text-base transform hover:scale-[1.02]"
            >
              Mentor Login
            </Link>
          </div>
        </nav>
        
        {/* --- HAMBURGER MENU BUTTON (Visible on Mobile) --- */}
        <button 
          onClick={toggleMenu} 
          // Icon color updated
          className="lg:hidden text-gray-300 focus:outline-none p-2 border border-gray-700 rounded-md hover:bg-neutral-700 transition"
          aria-label="Toggle Navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>
      
      {/* --- MOBILE MENU CONTENT (Dark Theme) --- */}
      <div className={`lg:hidden ${isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-500 ease-in-out bg-neutral-800 shadow-inner border-t border-gray-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          
          {/* Main Links */}
          <Link to="/home" onClick={toggleMenu} className={mobileLinkClasses}>
            Home
          </Link>
          <a href="#f" onClick={toggleMenu} className={mobileLinkClasses}>
            Contact Us
          </a>

          {/* Mobile Dropdown Title */}
          <h4 className="px-4 pt-4 text-sm font-bold text-orange-500 uppercase border-t border-gray-700">
            Counselling Programs:
          </h4>
          
          {/* Dropdown Items (Simplified) */}
          {dropdownItems.slice(0, 6).map((item, index) => (
            <a 
              key={`mobile-${index}`} 
              href="#a" 
              onClick={toggleMenu} 
              className="block px-4 py-2 text-base text-gray-400 hover:bg-neutral-700 transition"
            >
              {item}
            </a>
          ))}

          {/* Mobile Login CTAs */}
          <div className="pt-4 space-y-3 px-4">
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block w-full text-center px-5 py-2 border border-orange-500 text-orange-400 rounded-lg hover:bg-orange-900/40 font-semibold text-lg"
            >
              Student Login
            </Link>
            <Link
              to="/M"
              onClick={toggleMenu}
              className="block w-full text-center px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold text-lg shadow-md"
            >
              Mentor Login
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarOrganism = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: "mikodian", path: "/", icon: "" },
    { label: "lootzelui", path: "/", icon: "" },
    { label: "gawanisreal", path: "/", icon: "" },
    { label: "yogawan", path: "", icon: "" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-transparent backdrop-blur border-b border-black/10 dark:bg-black z-50">

      {/* Button & Logo */}
      <div className="w-full dark:border-white/15 px-4 py-4 flex items-center justify-between">
        
        {/* Button */}
        <div className="flex justify-between items-center">
          <button
            className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-white dark:bg-white rounded transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white dark:bg-white rounded transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white dark:bg-white rounded transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Label */}
        <p className="text-white text-xs px-3 py-3 border border-white/15 rounded-full" >JawirAIv1.6.3</p>

        {/* Logo */}
        {/* <div className="flex items-center text-lg font-inter font-bold italic underline text-black dark:text-white">
          <div className="w-10 h-10 rounded-full bg-white"></div>
        </div> */}
      </div>

      {/* Button Active */}
      <div
        className={`fixed left-0 top-0 bottom-0 h-screen w-screen pb-60 pt-10 pl-10 bg-black dark:bg-black flex flex-col items-start justify-start z-50 transform overflow-auto ${
          isMenuOpen
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 -translate-x-full scale-95"
        } transition-all duration-500 ease-in-out`}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        {/* Button X Kiri Atas */}
        <button
          className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Close Menu"
        >
          <div className="relative w-6 h-5">
            <span className="absolute top-0 left-0 block w-6 h-0.5 bg-white dark:bg-white rounded transform rotate-45"></span>
            <span className="absolute top-0 left-0 block w-6 h-0.5 bg-white dark:bg-white rounded transform -rotate-45"></span>
          </div>
        </button>

        {/* History Chat */}
        <ul className="space-y-[-12px] text-start">
          <p className="text-3xl text-white m-3">Contributors</p>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-start items-start text-white dark:text-white transition duration-500"
            >
              <Link
                to={item.path}
                className="font-inter m-3 text-xl font-thin transition-transform transform hover:scale-110"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
};

export default SidebarOrganism;

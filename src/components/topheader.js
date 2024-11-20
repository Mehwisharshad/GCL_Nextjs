import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const TopHeader = () => {
  return (
    <header className="h-12 flex items-center justify-between px-4 bg-white border-b">
      <div className="flex items-center">
        <img src="./gcl-logo.png" className="h-11 p-1" alt="Logo" />
      </div>
      <div className="header-right flex items-center space-x-4">
        <a href="#" className="user-link flex items-center space-x-1">
          <i className="fa fa-user-circle"></i>
          <span className="text-[#00adee] text-[12px]">demo</span>
        </a>
        <span>|</span>
        <a href="/" className="user-link text-[12px]">
          Logout
        </a>
        <span>|</span>
        <FontAwesomeIcon icon={faBell} className="text-blue-500 ml-2" />
      </div>
    </header>
  );
};

export default TopHeader;

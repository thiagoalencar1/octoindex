import React from 'react';
import NewProfile from './NewProfile';

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="text-xl">OctoScraper</a>
      </div>
      <NewProfile />
    </div>
  );
};

export default Navbar;

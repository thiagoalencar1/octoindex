import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 flex items-center justify-center">
        <img src="/octocat.svg" className="float-left" width={40} height={40} />
        <a className="text-4xl font-bold ml-2">OctoIndex</a>
      </div>
    </div>
  );
};

export default Navbar;

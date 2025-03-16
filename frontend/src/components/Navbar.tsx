import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        
      <a href="/"className="text-4xl font-bold ml-2">
        <img src="/octocat.svg" className="float-left" width={40} height={40} />
        OctoIndex
      </a>
      </div>
      <div className="navbar-center">
        <a href="/new-profile" className="flex items-center btn btn-primary btn-outline">
          Adicionar novo perfil
        </a>
      </div>
    </div>
  );
};

export default Navbar;

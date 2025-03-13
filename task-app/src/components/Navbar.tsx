import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand">
          Task Manager
        </Link>
        <div>
          <Link href="/tasks/new">
            <button className="btn btn-primary">Add New Task</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

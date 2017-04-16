import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="container-fluid border">
    <div className="row">
      <Link to="/"><h1 className="col-md-10 col-sm-8 col-xs-6">Ribbit</h1></Link>
      <Link to="/login"><h2 className="col-md-2 col-sm-4 col-xs-6">signup/login</h2></Link>
    </div>
  </div>
);

export default Navbar;

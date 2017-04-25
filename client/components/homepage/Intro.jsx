import React from 'react';
import CreateRoute from './CreateRoute';

const Intro = () => (
  <section id="intro" className="text-intro no-padding-bottom">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Save time <span className="rotate">collaborating</span> with your team</h1>
          <h3 className="weight-300">Code and communicate all in one place</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <p>Get started now.</p>
          <CreateRoute />
        </div>
      </div>
      <div className="col-md-12 col-lg-8 col-lg-offset-2">
        <p className="margin-bottom--zero"><img alt="" src="../img/introcode.png" className="img-responsive" /></p>
      </div>
    </div>
  </section>
);

export default Intro;

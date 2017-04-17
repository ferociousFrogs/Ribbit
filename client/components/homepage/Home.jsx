import React from 'react';
import CreateRoute from './CreateRoute';

const Home = () => (
  <div>
    <section id="intro" className="text-intro no-padding-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Do you code with <span className="rotate">remote team members</span>?</h1>
            <h3 className="weight-300">Let us help you</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>500,000 users have already trusted <a href="">Ribbit</a>.
            <br />
            Try it for yourself.</p>
            <CreateRoute />
          </div>
        </div>
        <div className="col-md-12 col-lg-8 col-lg-offset-2">
          <p className="margin-bottom--zero"><img alt="" src="../../introcode.png" className="img-responsive" /></p>
        </div>
      </div>
    </section>
  </div>
);

export default Home;

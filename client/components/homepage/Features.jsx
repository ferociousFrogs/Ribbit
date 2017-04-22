import React from 'react';

const Features = () => (
  <div>
    <section id="features" className="section">
      <div className="container">
        <div className="row text-center-mobile">
          <div className="col-md-6">
            <div className="icon"><i className="pe-7s-diamond" /></div>
            <h2>Real-time Collaborative Coding</h2>
            <p>Enter description for this feature</p>
          </div>
          <div className="col-md-6">
            <p><img alt="" src="../img/introcode.png" className="img-responsive" /></p>
          </div>
        </div>
      </div>
    </section>
    <section className="section background-gray-lightest">
      <div className="container">
        <div className="row text-center-mobile">
          <div className="col-md-6">
            <p><img alt="" src="../img/introcode.png" className="img-responsive" /></p>
          </div>
          <div className="col-md-6">
            <div className="icon brand-terciary"><i className="pe-7s-rocket" /></div>
            <h2>Video & Voice Chat</h2>
            <p>Enter description for this feature</p>
          </div>
        </div>
      </div>
    </section>
    <section className="section no-padding-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-8 col-lg-offset-2 text-center">
            <div className="icon brand-secondary"><i className="pe-7s-graph1" /></div>
            <h2>Text Chat</h2>
            <p>Enter description for this feature</p>
            <p className="margin-bottom--zero"><img alt="" src="../img/introcode.png" className="img-responsive" /></p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Features;

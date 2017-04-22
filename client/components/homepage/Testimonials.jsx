import React from 'react';

const Testimonials = () => (
  <section id="testimonials" className="section testimonials background-gray-lightest">
    <div className="container">
      <h2 className="text-center">
        What Our Customers Say
      </h2>
      <p className="lead text-center">We should be able to use http://htmlpreview.github.io/?https://github.com/OwlFonk/OwlCarousel/blob/master/index.html here</p>
      <div className="row">
        <div className="col-md-12">
          <ul className="testimonials same-height-row">
            <li className="item">
              <div className="testimonial same-height-always">
                <div className="text">
                  <p>Insert testimonial</p>
                </div>
                <div className="bottom">
                  <div className="testimonial-icon"></div>
                  <div className="name-picture"><img alt="" src="../img/kay.jpg" />
                    <h5>Kay Lee</h5>
                    <p>CEO, PadawanJS</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="item">
              <div className="testimonial same-height-always">
                <div className="text">
                  <p>Insert testimonial</p>
                </div>
                <div className="bottom">
                  <div className="testimonial-icon"></div>
                  <div className="name-picture"><img alt="" src="../img/kay.jpg" />
                    <h5>Kay Lee</h5>
                    <p>CEO, PadawanJS</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;

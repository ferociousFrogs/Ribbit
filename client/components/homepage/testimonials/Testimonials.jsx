import React from 'react';
import Testimonial from './Testimonial';
import testimonialInfo from './testimonialInfo';


const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: false,
    prevArrow: false,
    autoplaySpeed: 2000
  };

  return (
    <section id="testimonials" className="section testimonials background-gray-lightest">
      <div className="container">
        <h2 className="text-center">
          What the world is saying about Ribbit
        </h2>
        <div className="row">
          <div className="col-md-12">
            <ul className="testimonials same-height-row">
              {testimonialInfo.map(testimony => (
                <Testimonial
                  person={testimony}
                  key={testimony.name}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

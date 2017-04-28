import React from 'react';
import Slider from 'react-slick';


class Testimonials extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    };
    return (
      <section className="section testimonials background-gray-lightest">
        <div className="container">
          <div className="carousel">
            <h2 className="text-center">
              Testimonials
            </h2>
            <h4 className="carousel-text weight-300 text-center">Hear what our customers have to say...</h4>
            <Slider {...settings}>
              <div><img src="../../../img/kaytest.png" alt="" /></div>
              <div><img src="../../../img/briantest.png" alt="" /></div>
              <div><img src="../../../img/rebeccatest.png" alt="" /></div>
              <div><img src="../../../img/benjitest.png" alt="" /></div>
              <div><img src="../../../img/marcustest.png" alt="" /></div>
            </Slider>
          </div>
        </div>
      </section>
    );
  }
};

export default Testimonials;

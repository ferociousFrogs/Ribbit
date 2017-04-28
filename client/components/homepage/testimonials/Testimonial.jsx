import React from 'react';

const Testimonial = ({person}) => (
  <li className="item">
    <div className="testimonial same-height-always">
      <div className="text">
        <p>{person.quote}</p>
      </div>
      <div className="bottom">
        <div className="testimonial-icon"></div>
        <div className="name-picture"><img alt="" src={person.image} />
          <h5>{person.name}</h5>
          <p>{person.position, person.company}</p>
        </div>
      </div>
    </div>
  </li>
)

export default Testimonial;
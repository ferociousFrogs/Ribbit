import React from 'react';

const ContactItem = ({ name, about, github, linkedin }) => (
  <div className="col-xs-12 col-sm-6 col-md-3 text-center">
    <div className="box-simple">
      <img src={`../../img/${name}.jpg`} className="about-img" />
      <h3>{name}</h3>
      <p>{about}</p>
      <a href={`https://${github}`} >{github}</a>
      <br />
      <a href={`https://www.${linkedin}`}>{linkedin}</a>
    </div>
  </div>
);
export default ContactItem;

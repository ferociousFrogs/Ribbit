import React from 'react';

const ContactItem = props => (
  <div className="col-xs-12 col-sm-6 col-md-3 text-center">
    <div className="box-simple">
      <img src={`../../img/${props.name}.jpg`} className="icon" />
      <h3>{props.name}</h3>
      <p>Profile Info Summary</p>
      <a href={`https://${props.github}`} >{props.github}</a>
      <br />
      <a href={`https://www.${props.linkedIn}`}>{props.linkedin}</a>
    </div>
  </div>
);
export default ContactItem;

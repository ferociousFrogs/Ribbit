import React from 'react';
import ContactItem from './ContactItem';
import ourInfo from '../../../public/contactInfo';

const Contact = () => (
  <section id="contact" className="section background-gray-lightest">
    <div className="container">
      <div className="row">
        {ourInfo.map(person => (
          <ContactItem
            key={person.name}
            name={person.name}
            github={person.githubLink}
            linkedin={person.linkedinLink}
          />))
        }
      </div>
    </div>
  </section>
);

export default Contact;

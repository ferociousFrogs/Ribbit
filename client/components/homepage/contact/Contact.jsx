import React from 'react';
import ContactItem from './ContactItem';

const ourInfo = [
  {
    name: 'Andy Yeo',
    githubLink: 'github.com/misteryeo/',
    linkedinLink: 'linkedin.com/in/andycpyeo'
  }, {
    name: 'David Brodie',
    githubLink: 'coming soon!',
    linkedinLink: 'coming soon!'
  }, {
    name: 'Dylan Shelters',
    githubLink: 'github.com/dshelters',
    linkedinLink: 'coming soon!'
  }, {
    name: 'Jeff Milberger',
    githubLink: 'github.com/jefQuery',
    linkedinLink: 'linkedin.com/in/jeffreymilberger/'
  }
];

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

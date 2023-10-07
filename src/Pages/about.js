import React from "react";
import Header from '../components/Header';

function AboutPage({user}) {
  return (
    <>
    {/* <Header user={user} /> */}
    <div className="about-container">
      
      <h1>About Page</h1>
      <p>
        This podcast app is built with React in the frontend and Django REST Framework in the backend.
      </p>
      <p>
        React is a JavaScript library for building user interfaces, and it's used here to create a responsive and interactive frontend for the podcast app.
      </p>
      <p>
        Django REST Framework is a powerful and flexible toolkit for building Web APIs with Django. It provides a set of tools and functionalities to easily create RESTful APIs that the frontend interacts with to fetch and manipulate podcast data.
      </p>
      <p>
        Together, React and Django REST Framework make it possible to create a seamless and efficient podcast app that delivers a great user experience.
      </p>
    </div>
    </>
  );
}

export default AboutPage;

import React, { useState, useEffect } from 'react';
import UserPodcasts from '../components/userPodcastcard';
import Header from '../components/Header';
import { Form, Container, Row, Col, Button } from "react-bootstrap";
function Userpodcasts({ user }) {
  const [userpodcasts, setUserpodcasts] = useState([]);

  async function getUserpodcasts() {
    const response = await fetch(`http://localhost:8000/api-podcast/podcast/user/${user}`);
    const content = await response.json();
    setUserpodcasts(content);
    console.log(content);
  }

  useEffect(() => {
    getUserpodcasts();
  }, [user]);

  return (
    <>
    <Header user={user} />
    
    <div className="userpodcast">
    
      {userpodcasts.length >= 1 ? (
        userpodcasts.map((populardata) => {
          return (
            <div
              key={populardata.user}
              style={{ cursor: "pointer", width: '20rem' }}
            >
              <UserPodcasts post={populardata} email={user} />
            </div>
            
          );
        })
      ) : (
        <div>
          <h2>No Podcasts</h2>
        </div>
      )}
    
    </div>

  </>
  );
}

export default Userpodcasts;

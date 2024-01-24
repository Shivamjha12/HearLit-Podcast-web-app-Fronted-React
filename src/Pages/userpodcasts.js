import React, { useState, useEffect } from 'react';
import UserPodcasts from '../components/userPodcastcard';
import Header from '../components/Header';
import { Form, Container, Row, Col, Button } from "react-bootstrap";
function Userpodcasts({ user }) {
  const [userpodcasts, setUserpodcasts] = useState([]);
  const production_url = 'https://hearlitpodcast.onrender.com';
  async function getUserpodcasts() {
    const response = await fetch(`${production_url}/api-podcast/podcast/user/${user}`);
    const content = await response.json();
    setUserpodcasts(content);
    console.log(content);
  }

  useEffect(() => {
    getUserpodcasts();
  }, [user]);

  return (
    <>
    {/* <Header user={user} /> */}
    
    <div className="userpodcast">
    
      {userpodcasts.length >= 1 ? (
        userpodcasts.map((populardata) => {
          return (
            <Row>
            <div
              key={populardata.user}
              style={{ cursor: "pointer", width: '20rem' }}
            >
              <UserPodcasts post={populardata} email={user} />
              {/* <p>heree</p> */}
            </div>
            </Row>
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

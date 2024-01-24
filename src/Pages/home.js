import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Header from '../components/Header';
import axios from '../api/axios';
import Podcasts from '../components/podcastCards';
import favPodcast from './favPodcast';
// import './app.css';
import Cookies from 'js-cookie';

function Home() {
  const [populardata, setPopulardata] = useState([]);
  const [favdata, setfavdata] = useState([]);
  const [podcast, setPodcast] = useState([]);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [user, setUser] = useState('');
  const [meraToken,setMeraToken] = useState('None')
  const production_url = 'https://hearlitpodcast.onrender.com';
  async function popularPodcast() {
    const response = await fetch(`${production_url}/api-podcast/podcastFav/${user}/`);
    const content = await response.json();
    console.log(content);
    setfavdata(content);
    console.log(setfavdata, "This is setfavdata variable");
  }
  async function favPodcast() {
    const response = await fetch(`${production_url}/api-podcast/popular`);
    const content = await response.json();
    console.log(content);
    setPopulardata(content);
    console.log(populardata, "This is data variable");
  }

  async function handleSearch(e) {
    e.preventDefault();
    setIsSearch(true);
    const response = await fetch(`${production_url}/api-podcast/podcast/?search=${search}`);
    const content = await response.json();
    setPodcast(content);
    console.log(podcast, "This is Searched podcasts");
  }

  useEffect(() => {
    if (search === '') {
      setIsSearch(false);
    }
  }, [search]);

  useEffect(() => {
    (
      async () => {
        const token = Cookies.get('meraToken');
        setMeraToken(token)
        const response = await fetch(`${production_url}/api-user/user/${meraToken}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const content = await response.json();
        console.log(content.detail);
        setName(content.name);
        setUser(content.email);
        console.log(content.email);
        popularPodcast();
        favPodcast();

      }
    )();
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleScroll = (scrollOffset) => {
    const element = document.querySelector(".horizontal-view");
    if (element) {
      element.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="homeMain">
      <Container >
        <Row>
          <Col className="searchCol mt-2 ml-5" md={8} >
            <Form onSubmit={(e) => { onSubmit(e) }} className="d-flex">
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => { setSearch(e.target.value) }}
              />
              <Button onClick={(e) => {
                handleSearch(e);
              }}
                variant="outline-success">Search</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <h1 className="text-center">Hello {name}!</h1>
      <Container>
      <div>
      <Button
            className="scroll-buttonleft"
            variant="light"
            onClick={() => handleScroll(-600)}
          >
            <BsChevronLeft />
          </Button>
        <div className="horizontal-view">
          <div className="scroll-row">
            {isSearch
              ? (podcast.map((podcast) => {
                return (
                  <div
                    md={3}
                    key={podcast.user}
                    style={{ cursor: "pointer", width: '20rem' }} >
                    <Podcasts post={podcast} email={user.email} key={podcast.postid} />
                  </div>
                )
              }))
              : (
                
                populardata.map((populardata) => {
                return (
                  <div
                    // md={3} 
                    key={populardata.user}
                    style={{ cursor: "pointer", width: '20rem' }}
                  >
                    <Podcasts post={populardata} email={user} />
                    
                  </div>)
                }))
            }
          </div>
        </div>
        <Button
            className="scroll-buttonright"
            variant="light"
            onClick={() => handleScroll(600)}
          >
            <BsChevronRight />
          </Button>

          {favdata.length > 0 && (
          
          <div className="horizontal-view">
          <h3>Your Favorite</h3>
          <div className="scroll-row">
            {favdata.map((favData) => (
              <div
                key={favData.user}
                style={{ cursor: "pointer", width: '20rem' }}
              >
                <Podcasts post={favData} email={user} />
              </div>
            ))}
          </div>
          </div>)}
          


        </div>
        
      </Container>
    </div>
  );
}

export default Home;

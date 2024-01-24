import React,{ useEffect } from "react";
import { Navbar,Nav, Container,Row, Col } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
function Header({user}) {
    const navigate = useNavigate();
    const production_url = 'https://hearlitpodcast.onrender.com';
    async function handleLogout(e){
      e.preventDefault();
      const response = await fetch(`${production_url}/api-user/logout`,{
        method: "POST",
        headers: {
             "Content-Type": "application/json"
        },
        credentials:'include',
        body: JSON.stringify("")
        });
        Cookies.remove('meraToken');
        navigate('login/');
        console.log(response);
        navigate(0);

    }

    useEffect(() => {
      console.log("re render the navigation");
      console.log("----------------------------------user in head------------------------",user)
    },[handleLogout])
  return (
    <>
      <Navbar style={{ background: "white" }}>
        <Container>
          <Navbar.Brand onClick={(e)=>{navigate('/')}}>
            <img alt="" style={{ height: "45px", width:"45px"}} src={Logo} className="d-inline-block align-top" /> <p className="d-inline-block my-2 mx-2">HearLit</p>
          </Navbar.Brand>
          <Row>
            <Col md={12}>
            <Nav className="me-auto">
              {user!=="notUser"?(
              <>
              <Nav.Link onClick={(e)=>{navigate('/mypodcasts')}}>Your Podcast</Nav.Link>
              <Nav.Link onClick={(e)=>{navigate('/addpodcast')}}>Add Podcast</Nav.Link>
              <Nav.Link onClick={(e)=>{navigate('/about')}}>About Us</Nav.Link>
              <Nav.Link onClick={(e) =>{
                handleLogout(e);
                }}>Log out</Nav.Link>
              </>)
              :(
                <>
                <Nav.Link onClick={(e) =>{navigate('/register')}}>Signup</Nav.Link>
                <Nav.Link onClick={(e) =>{navigate('/login')}}>Login</Nav.Link>
                </>
                )
              
              }
              
            </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
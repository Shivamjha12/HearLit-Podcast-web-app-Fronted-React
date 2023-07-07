import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form, Container, Row, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
// margin: '1.5rem 1rem 1rem 1rem' style={{ height: 'auto',width: '23rem' }}
const handleScroll = (scrollOffset) => {
  const element = document.querySelector(".horizontal-view");
  if (element) {
    element.scrollBy({ left: scrollOffset, behavior: "smooth" });
  }
};

function UserPodcasts({post,email}){
    const navigate = useNavigate();
    const { title,postid,description, thumbnail, likes, file} = post;
    const baseurl = 'http://localhost:8000';
    console.log(email,"<------------email---------------------------->")
    return(
    <Col md={12}>
    <div>
    <Card className="userpodcastCard" style={{"height":"8rem", "width":"80rem","margin":"1rem 1rem 1rem 8rem"}}>
      <Card.Body>
        <div className="userpodcastimgdiv">
        <img className="userpodcastimage"  src={`${baseurl}${thumbnail}`} />
        </div>
        <div className="userpodcasttitle" >
        <p>{title} </p>
        </div>
        <div>
        </div>
        <p className="userpodcasttitle" >
          {description.slice(0, 100)}
        </p>
         <div className="userpodcastbutton" >
        <Button onClick={()=>{navigate(`/editpodcast/${postid}`,{ state: { prop1: email} });}} style={{"height":"3rem","width":"5rem", "margin":"-1.5rem 5rem 0rem 0rem"}} variant="primary">Edit</Button>
        </div>
    </Card.Body>
    </Card>
    </div>
    </Col>

    );
}

export default UserPodcasts;
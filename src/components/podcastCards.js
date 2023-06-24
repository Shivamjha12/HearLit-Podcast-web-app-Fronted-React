import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
// margin: '1.5rem 1rem 1rem 1rem' style={{ height: 'auto',width: '23rem' }}
function Podcasts({post,email}){
    const navigate = useNavigate();
    const { title,postid, thumbnail, likes, file} = post;
    const baseurl = 'http://localhost:8000';
    console.log(email,"<------------email---------------------------->")
    return(
    <Card className="podcastCard" >
      <Card.Img className="podcastImg" variant="top" src={`${baseurl}${thumbnail}`} />
      <Card.Body>
        <Card.Title>{title} </Card.Title>
        <Card.Text>{likes} people like this</Card.Text>
        {/* <Card.Text>
          {description.slice(0, 100)}
        </Card.Text> */}
        
        <Button onClick={()=>{navigate(`/podcast/${postid}`,{ state: { prop1: email} });}} variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    );
}

export default Podcasts;
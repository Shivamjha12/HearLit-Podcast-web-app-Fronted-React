import React,{useState,useEffect} from "react";
import { Container,Row,Col } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import Audioplayer from "../components/AudioPlayer"
import Actions from "../components/AudioComponents/actions";
import Controls from "../components/AudioComponents/controls";
import { useLocation,Link, useNavigate, useParams } from "react-router-dom";
import Header from '../components/Header';
// import { useLocation } from 'react-router-dom';
function Podcastpage({user}){
    const production_url = 'https://hearlitpodcast.onrender.com';
    const post = {
        "user": 2,
        "title": "Finshots Daily",
        "thumbnail": "/media/thumbnail/images.png",
        "description": "he Mindset Mentor™ podcast is designed for anyone desiring motivation, direction, and focus in life. Host Rob Dial has amassed a passionate following of over 3 million social media followers, including business professionals, entrepreneurs, and small business owners with his expertise and passion for helping motivate people to become the best version of themselves. In this podcast, Rob blends neurology, neurobiology, psychology, early childhood development, cognitive behavioral therapy so that you can understand the way your brain and body work together, because when you understand yourself, it makes it much easier to make a plan to change and succeed. When you master your mindset, you master your life. Over the past 15 years, he has studied with some of the greatest thought leaders of our time like Tony Robbins, Ram Dass, Dr. Joe Dispenza, Jay Shetty, Andrew Huberman and many more. If you're ready to take your life to the next level, are searching for more purpose or you just need extra inspiration or motivation, tune in to The Mindset Mentor Podcast. Follow Rob on Instagram @RobDialJr https://www.instagram.com/robdialjr/",
        "type": "Audio",
        "likes": 0,
        "speaker": "Shivam Jha",
        "file": "/media/podcast/Hanuman_ChalisaPagalWorld.com.se.mp3"
    }
    const location = useLocation()
    const props = location.state;
    const email = props.prop1;
    const { podcastID } = useParams();
    const [podcastdata,setPodcastdata] = useState([]);
    const actionData = {
        "username":email,
        "postid": podcastID
    }
    console.log(actionData,"actiondata <------------------------------------------------------------->");
    async function popularPodcast(){
        try{
        const response = await fetch(`${production_url}/api-podcast/podcast/${podcastID}`);
        const content = await response.json();
        console.log(content);
        setPodcastdata(content);
        console.log(podcastdata,"This is data variable");
        }
        catch(error){
            console.log(error);
            console.log("error happened");
        }
        console.log(actionData,"Here is action data variable========------========-------=")
    }
    const { title, thumbnail, description, type, likes, speaker, file} = podcastdata;
    const baseurl = 'http://localhost:8000';
    
    const songsdata = {
        "title": title,
        "url": file
    }
    useEffect(
        ()=>{
            console.log(podcastID);
            popularPodcast();
        }
    ,[podcastID]);
    return(
    <div class="pcp">
        <div className="podcastpagemain1">
        {/* <Header user={user} /> */}
        <Container className="podcastpagemain">
            
            <Row className="podcastpagerow1">
                <Col md="auto">
                <img className="podcastpageimg" src={`${production_url}${thumbnail}`} />
                </Col>
                <Col className="podcastpagecol1" md={8}>
                <p className="podcastpagetype">{type}</p>
                    <Col  className="Favorite-box">
                        <div className="fav-div-right">
                        <h2 className="podcastpagetitle">{title}</h2>
                        </div>
                        <div className="fav-div-left">
                        <Actions actionData={actionData} />
                        </div>
                    </Col>
                <p className="podcastpagelikes">Liked by {likes}</p>
                </Col>
            </Row>
            <Row className="podcastpagerow2">
                <h3 className="podcastpagespeaker">Added by {speaker}</h3>
            </Row>
            <Row className="podcastpagerow3">
                <p className="podcastpagespeaker">{description}</p>
            </Row>
            <Row><Controls post={podcastdata}/></Row>
        </Container>
        
        </div>
    </div>
    
    );
}
export default Podcastpage;
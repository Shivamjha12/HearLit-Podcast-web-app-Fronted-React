import React,{useState,useEffect} from "react";
import { Form,Container, Row, Col, Button } from "react-bootstrap";
import Header from '../components/Header';
import axios from '../api/axios'
import Podcasts from '../components/podcastCards';

function Home(){
    const [populardata,setPopulardata] = useState([]);
    const [podcast,setPodcast] = useState([]);
    const [name,setName] = useState('');
    const [search,setSearch] = useState('');
    const [isSearch,setIsSearch] = useState(false);
    const [user,setUser] = useState('');

    async function popularPodcast(){
        const response = await fetch('http://localhost:8000/api-podcast/popular');
        const content = await response.json();
        console.log(content);
        setPopulardata(content);
        console.log(populardata,"This is data variable");
    }

    async function handleSearch(e){
        e.preventDefault();
        setIsSearch(true);
        const response = await fetch(`http://localhost:8000/api-podcast/podcast/?search=${search}`);
        const content = await response.json();
        setPodcast(content);
        console.log(podcast,"This is Searched podcasts");
    }

    useEffect(() =>{
        if(search===''){
            setIsSearch(false);
        }
    },[search])
    useEffect(()=>{
        (
            async () => {
                
                const response = await fetch('http://localhost:8000/api-user/user',{
                // mode:'no-cors',-
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                });
                const content = await response.json();
                console.log(content.detail);
                setName(content.name);
                // setEmail(content.email);
                popularPodcast();
                setUser(content.email);
                console.log(content.email);
                
            }
        )();
    },[]
    );
    const onSubmit = async (e)=>{
        e.preventDefault();
        handleSearch();
    }
    
    console.log(user,"<--------------------------------user---------------------------->")
    return(
        <>
            <Header user={user}/>
            <Container>
            <Row>
                <Col className="searchCol mt-2 ml-5" md={8} >
                <Form onSubmit={(e)=>{onSubmit(e)}} className="d-flex">
                    <Form.Control
                    placeholder="Search"
                    
                    aria-label="Search"
                    onChange={(e)=>{setSearch(e.target.value)}}
                    />
                    <Button onClick={(e) =>{ 
                        handleSearch(e);
                    }}
                        variant="outline-success">Search</Button>
                </Form>
                </Col>
            </Row>
            </Container>
            <h1 className="text-center">Hello {name}!</h1>
            <Container>
            <Row>
            {isSearch
            ?(podcast.map((podcast)=>{
                return(
                    // <p key={populardata.user}>{populardata.title}</p>
                    <Col
                      md={3}
                      key={podcast.user}
                    //   onClick={() => navigate(`/post/${post.id}`)}
                      style={{ cursor:"pointer", width: '20rem' }}
                    >
                      <Podcasts post={podcast} email={user.email} key={podcast.postid}/>
                    </Col>
                )
            })
            )
            :(
                populardata.map((populardata)=>{
                console.log("this is popular podcast")
                return(
                    // <p>This is popular podcast</p>
                    // <p key={populardata.user}>{populardata.title}</p>
                    <Col
                      md={3}
                      key={populardata.user}
                    //   onClick={() => navigate(`/post/${post.id}`)}
                      style={{ cursor:"pointer", width: '20rem' }}
                    >
                      <Podcasts post={populardata} email={user}/>
                    </Col>
                )
            })
            )
                
            }
            </Row>
            </Container>
        </>
    );
}
export default Home;
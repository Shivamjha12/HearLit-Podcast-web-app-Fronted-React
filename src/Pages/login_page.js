import React,{useState} from "react";
import { Form,Container, Row, Col, Button } from "react-bootstrap";
import Header from '../components/Header';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
function Login(){
    const navigate = useNavigate();
    // const [jwt,setJwt]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const production_url = 'https://hearlitpodcast.onrender.com';
    const onSubmit = async (e)=>{
        e.preventDefault();
        const signupData = {
            email,
            password
        }
        console.log(JSON.stringify(signupData));
        const response = await fetch(`${production_url}/api-user/login`,{
            method: "POST",
            headers: {
                 "Content-Type": "application/json"
            },
            credentials:'include',
            body: JSON.stringify(signupData)
            
        });
        const content = await response.json();
        if(content.detail==="You are not registered on the platform" || content.detail==="password is incorrect")
        {
            alert("Email or password is incorrect");
            navigate('/login');

        }
        else
        {
        
        // setJwt(content.jwt)
        // console.log(jwt)
        Cookies.set('meraToken', content.jwt, { expires: 24*60*60 });
        // Cookies.set('jwt', jwt, { expires: 60 * 60 * 24 * 1, httpOnly: true });
        // console.log(content.jwt," here is the jwt-> ",jwt,"here is login page content");
        navigate('/');
        navigate(0);
        }
        
    }

    return(
        <div>
            {/* <Header/> */}
            <Container>
                <div className="loginform">
                <h3>Log In</h3>
                <Form onSubmit={(e)=>{onSubmit(e)}}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="emal"
                        required
                        name="email"
                        placeholder='Enter Register Email'
                        defaultValue={""}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        name="password"
                        placeholder='Password'
                        defaultValue={""}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Button varient="primary" type="submit" className="submitButton">
                    Submit
                </Button>
                </Form>
                </div>
                
            </Container>
        </div>
    );
}
export default Login;

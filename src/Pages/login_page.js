import React,{useState} from "react";
import { Form,Container, Row, Col, Button } from "react-bootstrap";
import Header from '../components/Header';
import {useNavigate} from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const onSubmit = async (e)=>{
        e.preventDefault();
        const signupData = {
            email,
            password
        }
        console.log(JSON.stringify(signupData));
        const response = await fetch('http://localhost:8000/api-user/login',{
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
        console.log(content,"here is login page content");
        navigate('/');
        }
        
    }

    return(
        <div>
            <Header/>
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
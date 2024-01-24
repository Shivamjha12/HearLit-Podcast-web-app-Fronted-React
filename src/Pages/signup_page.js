import React,{useState} from "react";
import { Form,Container, Row, Col, Button } from "react-bootstrap";
import Header from '../components/Header';
import {useNavigate} from "react-router-dom";


function Signup(){
    const navigate = useNavigate();
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [confirmpassword,setConfirmpassword]= useState('');
    const production_url = 'https://hearlitpodcast.onrender.com';

    const onSubmit = async (e)=>{
        e.preventDefault();
        if(password=== confirmpassword){
        const signupData = {
            name,
            email,
            password
        }
        console.log(JSON.stringify(signupData));
        const response = await fetch(`${production_url}/api-user/register`,{
            method: "POST",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
            
        });
        const content = await response.json();
        console.log(content);
        alert("Successfully Registered You Can Login Now");
        navigate('/login');
        
    }
    else{
        alert("Password and confirm Password field value is diffrent")
    }
    }
    return(
        <div>
            {/* <Header/> */}
            <Container>
                <div className="signupform">
                <h3>Sign up</h3>
                <Form onSubmit={(e)=>{onSubmit(e)}}>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        name="name"
                        placeholder='Enter Your Name'
                        defaultValue={""}
                        onChange={(e)=>{setName(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        name="email"
                        placeholder='Enter Your Email'
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
                        placeholder='Create Password'
                        defaultValue={""}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        name="confirmpassword"
                        placeholder='Confirm Password'
                        defaultValue={""}
                        onChange={(e)=>{setConfirmpassword(e.target.value)}}
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
export default Signup;

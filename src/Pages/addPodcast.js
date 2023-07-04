import React, { useEffect, useState } from 'react'
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Header from '../components/Header';
function AddPodcast({user1}){
    const [user,setUser] = useState('')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [speakername, setSpeakername] = useState('')
    const [imagefile,setimagefile] = useState(null)
    const [audiofile,setaudiofile] = useState(null)

    useEffect(()=>{
        setUser(user1)
    },[user]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('formuser', user);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('speakername',speakername);
        formData.append('imagefile', imagefile);
        formData.append('audiofile', audiofile);

        // const image = str(imagefile).split('.')
        console.log(imagefile);
        const url = 'http://localhost:8000/api-podcast/podcast/add/';
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (response.status === 201) {
            alert('Post created successfully!');
        } else {
            alert('Something went wrong!');
        }


      };

        

    return(<div >
        <Header user={user1} />
        <Container>
                <div className="podcast_form my-5">
                <h3>Add your podcast</h3>
                <Form onSubmit={(e)=>{handleSubmit(e)}}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        name="title"
                        placeholder='Enter Your Title'
                        defaultValue={""}
                        onChange={(e)=>{setTitle(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Thumbnail</Form.Label>
                    <Form.Control
                        type="file"
                        required
                        name="thumbnail"
                        placeholder='Add your Thumbnail'
                        defaultValue={""}
                        onChange={(e)=>{setimagefile(e.target.files[0])}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        name="description"
                        placeholder='Add description'
                        defaultValue={""}
                        onChange={(e)=>{setDescription(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Speaker Name</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        name="speakername"
                        placeholder='speakername'
                        defaultValue={""}
                        onChange={(e)=>{setSpeakername(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Add File</Form.Label>
                    <Form.Control
                        type="file"
                        required
                        name="podcastfile"
                        placeholder='podcastfile'
                        defaultValue={""}
                        onChange={(e)=>{setaudiofile(e.target.files[0])}}
                    >
                    </Form.Control>
                </Form.Group>
                <Button varient="primary" type="submit" className="submitButton">
                    Submit
                </Button>
                </Form>
                </div>
                
            </Container>
    </div>)
}

export default AddPodcast;
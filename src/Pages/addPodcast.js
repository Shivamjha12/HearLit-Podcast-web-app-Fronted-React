import React, { useEffect, useState } from 'react'
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Header from '../components/Header';
import Cookies from 'js-cookie';
import { useNavigate,useParams } from 'react-router-dom';

function AddPodcast({user1}){
    const navigate = useNavigate();
    const [user,setUser] = useState('')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [speakername, setSpeakername] = useState('')
    const [imagefile,setimagefile] = useState(null)
    const [audiofile,setaudiofile] = useState(null)
    const [id,setId] = useState('')
    const [editPodcastdata,setEditpodcastdata] = useState([]);
    const {editID} = useParams()
    const baseurl = 'http://localhost:8000';
    const production_url = 'https://hearlitpodcast.onrender.com';
    useEffect(()=>{
        setUser(user1)
        if(editID){
            setId(editID);
            EditPodcastData().then();
            console.log(title," - ",description," - ",speakername," getfunction2")
        }
    },[user,editID]);
    async function EditPodcastData(){
        try{
        const response = await fetch(`${production_url}/api-podcast/podcast/${editID}`);
        const content = await response.json();
        setEditpodcastdata(content);
        console.log(editPodcastdata,"the data is set")

        
        }
        catch(error){
            console.log(error);
            console.log("error happened");
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title," - ",description," - ",speakername," getfunction3")
        const formData = new FormData();
        formData.append('formuser', user);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('speakername',speakername);
        formData.append('imagefile', imagefile);
        formData.append('audiofile', audiofile);
        if(editID){
            const editformData = {
                "title": title==='' ? editPodcastdata.title : title,
                "description": description==='' ? editPodcastdata.description : description,
                "speaker": speakername===''? editPodcastdata.speaker: speakername,
              };
            const url = `${production_url}/api-podcast/podcast/update/${editID}`;
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(editformData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(editformData,"--------------------here is editformdata-----------------------")
            console.log(response,"Response from url");
            if(response.status === 201){
                alert('Edits saved successfully!');
                navigate('/mypodcasts');

            }else { alert('Something went wrong!'); }
            console.log(editPodcastdata)
            console.log(editPodcastdata," value of editPodcastdata")
        }
        else{
            const url = `${production_url}/api-podcast/podcast/add/`;
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                
            });

            if(response.status === 201){
                const token = Cookies.get('meraToken');
                console.log(token,"Hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                alert('Post created successfully!');
            }else { alert('Something went wrong!'); }
        }


      };

        

    return(<div >
        {/* <Header user={user1} /> */}
        <Container>
                <div className="podcast_form my-5">
                {id===''?<h3>Add your podcast</h3>:<h3>Edit Your Podcast Details</h3>}
                <Form onSubmit={(e)=>{handleSubmit(e)}}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        name="title"
                        defaultValue={id && editPodcastdata.title}
                        placeholder='Enter Your Title'
                        onChange={(e)=>{setTitle(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                {
                id===''?<Form.Group className="mb-3">
                    {id && (<img style={{"height":"5rem","width":"5rem"}} src={`${production_url}${editPodcastdata.thumbnail}`} />) }
                    <Form.Label>{id===''?"Add Thumbnail":"Current Thumbnail"}</Form.Label>
                    <Form.Control
                        type="file"
                        {...id===''?"required":{}}
                        name="thumbnail"
                        placeholder={id===''?"Add your Thumbnail":"Add new thumbnail"}
                        defaultValue={""}
                        onChange={(e)=>{setimagefile(e.target.files[0])}}
                    >
                    </Form.Control>
                </Form.Group>:<div><p>Currently <strong>thumbnail</strong> can't be edit</p></div>
                }
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        {...id===''?"required":{}}
                        name="description"
                        placeholder='Add description'
                        defaultValue={id && editPodcastdata.description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Speaker Name</Form.Label>
                    <Form.Control
                        type="text"
                        {...id===''?"required":{}}
                        name="speakername"
                        placeholder='speakername'
                        defaultValue={id && editPodcastdata.speaker}
                        onChange={(e)=>{setSpeakername(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                {
                id===''?<Form.Group className="mb-3">
                    <Form.Label>{id===''?"Add File":"Edit File"}</Form.Label>
                    {id && ( <div className="edit-form-user">
                        <p>Current Audio</p>
                        <audio  src={`${production_url}${editPodcastdata.file}`} controls/> 
                    </div>)
                    

                   }
                    <Form.Control
                        type="file"
                        {...id===''?"required":{}}
                        name="podcastfile"
                        placeholder='podcastfile'
                        defaultValue={""}
                        onChange={(e)=>{setaudiofile(e.target.files[0])}}
                    >
                    </Form.Control>
                </Form.Group>:<div><p>Currently <strong>Audio File</strong> can't be edit</p></div>
                }
                <Button varient="primary" type="submit" className="submitButton">
                    {id===''?"Submit":"Save Edit"}
                </Button>
                </Form>
                </div>
                
            </Container>
    </div>
    )
}

export default AddPodcast;
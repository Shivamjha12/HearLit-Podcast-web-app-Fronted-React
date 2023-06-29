import './App.css';
import React,{ useState,useEffect } from "react";
import Login from './Pages/login_page';
import Signup from './Pages/signup_page';
import Home from './Pages/home';
import Header from './components/Header';
import Podcastpage from './Pages/podcast_content';
import loader from "./assets/loader.gif";
// import podcast_card from './components/podcast_card';
import {useNavigate} from "react-router-dom";
import { Route, Routes,Navigate,Redirect  } from "react-router-dom";
function App() {

  const [user,setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    (
        async () => {
            
            const response = await fetch('https://hearlit-podcast-web-app-backend-djangorest.shivamkrjha.repl.co/api-user/user',{
            // mode:'no-cors',-
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            });
            const content = await response.json();
            console.log(content.detail);
            if(content.email){
              await setUser(content.email);
            }
            else{
              setUser('notUser');
            }
            console.log(user, "here we checking the data is set in user or not");
            
        }
    )();
},[user]);

  if(user==null){
    return <div className="loader-container">
      <img src={loader} alt="Loading" className="loader-image" />
    </div>
  }
  return (
    <>
    <Routes>
    <Route path="/" element={user==='notUser'?(<Login/>):(<Home/>)}/> 
    <Route path="/register" element= {user==='notUser'?(<Signup/>):(<Home/>)}/>
    <Route path="/login" element={user==='notUser'?(<Login/>):(<Home/>)}/>
    <Route path="/podcast/:podcastID" element= {<Podcastpage/>} />
    </Routes>
    </>
  );
  }

export default App;

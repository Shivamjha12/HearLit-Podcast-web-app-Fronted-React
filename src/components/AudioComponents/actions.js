import React,{useEffect, useState} from 'react';


function Actions({actionData}){
    const[isfav,setisfav]=useState(0);
    const [favbtn,setfavbtn]=useState("far fa-heart fa-2x");
    const [response,setResponse]=useState('');

    useEffect(
        ()=>{
            (
                async () => {
                    
                    const response = await fetch('http://localhost:8000/api-user/user',{
                    // mode:'no-cors',-
                    headers:{'Content-Type':'application/json'},
                    credentials:'include',
                    });
                    const response1 = await fetch(`http://127.0.0.1:8000/api-podcast/podcastFav/${actionData.postid}/${actionData.username}/`);
                    const data = await response1.json();
                    if(data.is_favorite){
                        setfavbtn("fa fa-heart fa-2x");
                         setisfav(1);
                    }
                    else{
                        setfavbtn("far fa-heart fa-2x");
                        setisfav(0);
                    }
                    
                }
                
            )();
        },[isfav]
        );


    async function handleFav(){
        if(isfav){
            const response = await fetch(`http://127.0.0.1:8000/api-podcast/podcastFav/${actionData.postid}/${actionData.username}/`,
            {
            method: "POST",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify(actionData) 
            
        });
            console.log(JSON.stringify(actionData), "~~~~~~~~~~~~~~~~~~~~~~~~here is json~~~~~~~~~~~~~~~~~~")
            console.log(actionData,"<<<<<<-----------------actionData----------------------------->");
            setResponse(response);
            console.log(response, "Here is is the response-----------x-x--x-x-x-x-x-x--x-x--");
            setfavbtn("far fa-heart fa-2x");
            setisfav(0);
        }
        else{
            setfavbtn("fa fa-heart fa-2x");
            setisfav(0);
        }
    }
    return( <div className="action-main">
            <div className="actionBtns">
                <button onClick={(e) =>{handleFav()}} className="fav_btn">
                    <i class={favbtn}  ></i>
                </button>
            </div>
        </div>
        
    )
}
export default Actions;
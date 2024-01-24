import React,{useEffect, useState} from 'react';


function Actions({actionData}){
    const[isfav,setisfav]=useState(0);
    const [favbtn,setfavbtn]=useState("far fa-heart fa-2x");
    const [response,setResponse]=useState('');
    const production_url = 'https://hearlitpodcast.onrender.com';
    useEffect(
        ()=>{
            (
                async () => {
                    
                    const response = await fetch(`${production_url}/api-user/user`,{
                    // mode:'no-cors',-
                    headers:{'Content-Type':'application/json'},
                    credentials:'include',
                    });
                    const response1 = await fetch(`${production_url}/api-podcast/podcastFav/${actionData.postid}/${actionData.username}/`);
                    const data = await response1.json();
                    console.log("Useffect Loaded first time")
                    console.log(isfav,"Isfav variable")
                    if(data.is_favorite){
                        setfavbtn("fa fa-heart fa-2x");
                         setisfav(1);
                    }
                    else{
                        setfavbtn("far fa-heart fa-2x");
                        setisfav(0);
                    }
                    console.log(data,"Data is loading...........")
                    console.log(isfav,"Isfav variable")
                    console.log("Useffect Loaded first time")
                    
                }
                
            )();
        },[]
        );


    async function handleFav(){
        if(isfav){
            const response = await fetch(`${production_url}/api-podcast/podcastFav/${actionData.postid}/${actionData.username}/`,
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
            const response = await fetch(`${production_url}/api-podcast/podcastFav/${actionData.postid}/${actionData.username}/`,
            {
            method: "POST",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify(actionData) 
        
        });
        console.log(JSON.stringify(actionData))
            setfavbtn("fa fa-heart fa-2x");
            setisfav(1);
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
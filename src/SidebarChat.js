import './css/SidebarChat.css'
import React,{useEffect,useState} from 'react'
import { Avatar } from '@material-ui/core';
import db from './firebase'                              // default export
import {Link} from "react-router-dom";
function SidebarChat({id,data,addNewChat}) {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        db.collection('rooms').doc(id).collection('messages').onSnapshot(
            snapshot=>(
                setMessages(snapshot.docs.map((doc)=>(doc.data())))
            )
        )
    }, [id])

    const creatChat=()=>{
    const roomName = prompt('Add a new Chat...')
    if(roomName){
     const unsubscribe = db.collection('rooms').add({
            name:roomName
        })
        return ()=>{
            unsubscribe();           //clean up
        }}else{

            alert('You did not type anything.')
        }
    };
    return  !addNewChat?(
       <Link to={`/rooms/${id}`}>
            <div className='sidebar_chat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
                <div className="sidebar_chat_info">            
                <h5>{data.name}</h5>
                <p>{messages[messages.length-1]?.message}</p>
                </div>           
            </div>
       </Link>
        )
        : (<div onClick={creatChat} className='sidebar_chat'>
        <h2>Add new chat...</h2>
        </div>
    )
}

export default SidebarChat

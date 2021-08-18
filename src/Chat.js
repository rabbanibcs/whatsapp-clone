import React,{useState,useEffect} from 'react'
import './css/Chat.css'
import { Avatar } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import db from './firebase';
import {useParams} from "react-router-dom";
import {useStateValue} from './StateProvider'
import firebase from 'firebase';

function Chat() {
    const {currentUser}=useStateValue()

    const [input,setInput]=useState('')
    const [room, setRoom] = useState('')
    const {roomId} = useParams()
    const [messages, setMessages] = useState([])



    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: currentUser.displayName,
            email:currentUser.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        console.log(input);
        setInput('')

    }
    useEffect(
        ()=>{
            db.collection('rooms').doc(roomId).onSnapshot(
                snapshot=>{
                    setRoom(snapshot.data()?.name)
                }
            )
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp')
              .onSnapshot(
                  snapshot=>{
                      setMessages(snapshot.docs.map((doc)=>(
                            doc.data()
                      )))
                  }
              )
        },[roomId,messages]




    )
    return (
        <div className='chat'>
            <div className="chat_header">
            <Avatar />
            <div className="chat_headerInfo">
            <h5>{room}</h5>
            <p>Last seen {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
            </div>
            <div className="chat_headerRight">
            <IconButton style={{padding:0}}> <SearchIcon /></IconButton>
            <IconButton style={{padding:0}}><AttachFileIcon /></IconButton>            
            <IconButton style={{padding:0}}><MoreVertIcon /></IconButton> 
            </div>
            </div>
                <div className="chat_body">
                {messages.map((eachmessage,id)=>(

                    <p key={id} className={`chat_message ${eachmessage.email===currentUser.email?'reciever':null}`}> 
                    <span className='chat_name'>{eachmessage.name}</span>                   
                        {eachmessage.message}
                        <span className='chat_timestamp'>{new Date(eachmessage.timestamp?.toDate()).toUTCString()}</span>
                    </p>

                ))}
                    
                    
                    
                    
                </div>
            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form action="">
                    <input onChange={e=>setInput(e.target.value)} value={input} placeholder='Type a message'/>
                    <button onClick={sendMessage} type='submit'>send message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat

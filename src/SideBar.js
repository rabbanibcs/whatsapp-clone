import React,{useState,useEffect} from 'react'
import './css/SideBar.css'
import SidebarChat from './SidebarChat'
import { Avatar } from '@material-ui/core';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import db from './firebase'                              // default export
import {useStateValue} from './StateProvider'



function SideBar() {

    const [rooms, setRooms] = useState([]);
    const {currentUser,signOut}=useStateValue()

    


    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot=>{
            setRooms(snapshot.docs.map((doc)=>(
                {
                    id:doc.id,
                    data: doc.data(),
                }
            )))
        })
        
    }, []);

    return (
        <div className='sidebar'>
            
            <div className="sidebar_header">
                <IconButton style={{padding:0}} onClick={signOut}>
                <Avatar src={currentUser.photoURL}/>
                </IconButton>
                <div className="sidebar_header_right">
                    <IconButton style={{padding:0}}><DonutLargeIcon /></IconButton>
                    <IconButton style={{padding:0}}> <SpeakerNotesIcon /></IconButton>
                    <IconButton style={{padding:0}}><MoreVertIcon /></IconButton>                                    
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_search_container">
                <SearchIcon/>
                <input placeholder='Search or a new chat..'/>
                </div>    
                
            </div>
            <div className="sidebarchats">
            <SidebarChat addNewChat/>    {/*// notice it */}

                {
                    rooms.map(({id,data})=>(

                        <SidebarChat  key={id} id={id} data={data} />
                    ))
                }             
             </div>
        </div>
    )
}

export default SideBar


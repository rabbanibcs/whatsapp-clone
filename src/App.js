import './css/App.css';
import Chat from './Chat';
import SideBar from './SideBar';
import {BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import LogIn from './LogIn';
import React,{useEffect} from 'react'
import {useStateValue} from './StateProvider'
import {auth} from './firebase'

function App() {
  const {currentUser,setCurrentUser}=useStateValue()

  useEffect(
    auth.onAuthStateChanged((user)=>{
      if (user) {
          setCurrentUser(user);         

      } 
    })
    )

  return (
    !currentUser? 
    <LogIn/>:    
      <div className="App">      
        <div className="app_body">
          <Router>
            <SideBar />
            <Switch>
              <Route path='/rooms/:roomId'>
                <Chat />
              </Route>

              <Route path='/'>
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    
  );
}

export default App;

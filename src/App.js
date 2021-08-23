import './css/App.css';
import Chat from './Chat';
import SideBar from './SideBar';
import {BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import LogIn from './LogIn';
import React,{useLayoutEffect} from 'react'
import {useStateValue} from './StateProvider'

function App() {
  const {currentUser,setCurrentUser}=useStateValue()
 
  useLayoutEffect(()=>{    
  const user =JSON.parse(window.sessionStorage.getItem('user'))
  setCurrentUser(user)
  

} ,[setCurrentUser])

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

import React from 'react'
import './css/LogIn.css'
import Button from '@material-ui/core/Button';
import {useStateValue} from './StateProvider'

function LogIn() {
    const {signIn}=useStateValue()

    return (           
        
        <div className='login'>
            <div className='login__container'>
                <img alt='sorry' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png' />
                <h2>Login to WhatsApp</h2>
                <Button onClick={signIn} variant="contained" color="secondary" >
                Sign in with Google
                </Button>
            </div>
            
        </div>
    )
}

export default LogIn

import React, { useRef, useState } from 'react'
import './Login.css'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
function Login(props) {
  const [failure,setFailure] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value
    }

    try{
      const response = await axios.post("/users/login", user);
      setFailure(false);
    }catch(err){
        setFailure(true);
        console.log(err);
    }
  }
  return (
    <div className='loginContainer'>
      <div className="logo">
        <AppRegistrationIcon fontSize='large'/>
        <label style={{backgroundColor:"rgb(255, 145, 0)", fontSize:"25px", color:"black"}}>TravelStar</label>
      </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' ref={nameRef} />
            <input type="password" placeholder='Password' ref={passwordRef}/>
            <button className='loginButton'>Login</button>
            {failure && 
              <span className='failure'>Something Went wrong. Try again</span>
            }
        </form>
        <CancelIcon className='logincancel' onClick={()=>props.setShowLogin(false)}/>
    </div>
  )
}

export default Login;
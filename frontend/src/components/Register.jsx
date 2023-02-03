import React, { useRef, useState } from 'react'
import './Register.css'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
function Register(props) {
  const [success,setSuccess] = useState(false);
  const [failure,setFailure] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    try{
      const response = await axios.post("/users/register", newUser);
      setFailure(false);
      setSuccess(true);
    }catch(err){
        setFailure(true);
        console.log(err);
    }
  }
  return (
    <div className='registerContainer'>
      <div className="logo">
        <AppRegistrationIcon fontSize='large'/>
        <label style={{backgroundColor:"rgb(255, 145, 0)", fontSize:"25px", color:"black"}}>TravelStar</label>
      </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' ref={nameRef} />
            <input type="email" placeholder='Email' ref={emailRef}/>
            <input type="password" placeholder='Password' ref={passwordRef}/>
            <button className='registerButton'>Register</button>
            {success &&
              <span className='success'>Successful Registration. You can Login Now.</span>
            }
            {failure && 
              <span className='failure'>Something Went wrong. Try again</span>
            }
        </form>
        <CancelIcon className='registercancel' onClick={()=>props.setShowRegister(false)}/>
    </div>
  )
}

export default Register;
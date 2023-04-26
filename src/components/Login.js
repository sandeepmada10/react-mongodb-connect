import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import "../App.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors,setErrors]=useState({});
    
    const navigate= useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate("/");
        }
    })

    const handleLogin = async () => {
        let result= await fetch("http://localhost:4002/userlogin",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
     result= await result.json();
     console.log(result)
     if(result.name){
        localStorage.setItem("user",JSON.stringify(result));
        navigate("/")
     }else {
        setErrors(validate(email,password))
        console.log("Enter the correct details");
     }
    }
    const validate = (email,password) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        
        if (!email) {
          errors.email = "Email is required"
        } else if (!regex.test(email)) {
          errors.email = "This is not a valid email address format"
        }
        if (!password) {
          errors.password = "Password is required"
        } else if (password < 4) {
          errors.password = "Password must be more than 4 characters"
        } else if (password > 10) {
          errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
      }

    return (
        <div className='login'>
            <h1>Login </h1>
            <label className='label-text'>Email: </label>
            <input
                type='text'
                className='inputbox'
                value={email}
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} />
                <p className='error-text'>{errors.email}</p>
            <label className='label-text'>Password: </label>
            <input
                type='text'
                className='inputbox'
                value={password}
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} />
                <p className='error-text'>{errors.password}</p>
            <button type='submit' className='loginbutton'
                onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login
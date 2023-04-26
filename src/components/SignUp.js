import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs"; 
// const bcrypt = require('bcrypt');

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors,setErrors]=useState({});
    
    // const [isSubmit, setIsSubmit] = useState(false);

    const hashedPassword = bcrypt.hashSync(password,10)
    

    const navigate = useNavigate();  
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/login')
        }
    },[navigate])



    const collectData = async () => {
        console.log(name, email, hashedPassword)
        let result = await fetch("http://localhost:4002/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // result.password=hashedPassword;
        result = await result.json();
        // console.log(result.password);
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result))
        // console.log(hashedPassword);
        
        if(name && email && password){
            
            navigate('/login');
            
            setErrors(validate(name,email,password));
            alert("Registration Successful");
        }else{
            setErrors(validate(name,email,password));
            // console.log(errors);
        }
       
    }

    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     setErrors(validate(name,email,password));
    //     setIsSubmit(true);
    //     navigate('/')
    // }

    const validate = (name,email,password) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!name) {
          errors.name = "Name is required!";
        }
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
        <div className='register'>
            {/* <form onSubmit={handleSubmit}> */}
            <h1>Register</h1>
            <input
                className='inputbox'
                type="text"
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)} />
                <p className='error-text'>{errors.name}</p>
            <input
                className='inputbox'
                type="text"
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <p className='error-text'>{errors.email}</p>
            <input
                className='inputbox'
                type="password"
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <p className='error-text'>{errors.password}</p>
            <button
                onClick={collectData}
                className='signupbutton'
                type='submit'>
                Sign Up
            </button>
            {/* </form> */}
        </div>
    )
}

export default SignUp;
import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const collectData = async () => {
        console.log(name, email, password)
        let result = await fetch("http://localhost:4001/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result))
        navigate('/');
        alert("Registration Successful");
    }

    return (
        <div className='register'>
            <h1>Register</h1>
            <input
                className='inputbox'
                type="text"
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <input
                className='inputbox'
                type="text"
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input
                className='inputbox'
                type="password"
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <button
                onClick={collectData}
                className='signupbutton'
                type='button'>
                Sign Up
            </button>
        </div>
    )
}

export default SignUp;
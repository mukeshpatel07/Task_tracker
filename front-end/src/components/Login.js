import React, { useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[navigate]);


    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },

        });

        result=await result.json();
        console.warn(result);

        if(result.auth){

            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/')
        }else{
            alert("Please Enter the correct detail");
        }
    }
    return (
        <div className="login">
            <h2 >Welcome Back! Login to your account</h2>
            <input className="inputBox" type="text" placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            >
            </input>
            <input className="inputBox" type="password" placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            >
            </input>

            <button className="btn" onClick={handleLogin} type="button">Login</button>

             <Link to="/signup/" >Create Account</Link>

        </div>
    )
}

export default Login;
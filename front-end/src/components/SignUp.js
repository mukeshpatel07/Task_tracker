import  React,{ useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country,setCountry] =useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
          navigate("/");
        }
      }, [navigate]); 


    const collectinputData = async () => {
        console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password,country}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/')


    }

    return (
        <div className="signup">
            <h2>Sign Up</h2>
            <input className="inputBox" type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name" />
            <input className="inputBox" type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" />
            <input className="inputBox" type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
            <input className="inputBox" type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country" />    
            <button onClick={collectinputData} className="btn" type="button" >Signup</button>
        </div>
    )
}
export default SignUp;
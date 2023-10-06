import { useState } from "react";

export default function Registerpage() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const  register = async(e) => {
        e.preventDefault(); 
        const url="http://localhost:5000/register";
        const options={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username,password })
        }
       const response= await fetch(url,options);
        if(response.status===200){
            console.log(response);
            alert("Registration Successfull")
        }
        else{
            alert("Registration Failed");
        }
    }

    return (
        <form className="login" onSubmit={register}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Enter User Name"
                name="username"
                value={username}
                onChange={(e) => {
                    setusername(e.target.value);
                }}
                required
            />
            <input
                type="password"
                placeholder="Enter your Password"
                name="password"
                value={password}
                onChange={(e) => {
                    setpassword(e.target.value);
                }}
                required
            />
            <button>Register</button>
        </form>
    )
}

import {useContext, useState} from 'react'
import {Navigate} from "react-router-dom"
import { userContext } from '../userContext';


export default function Login() {
    
const [username, setusername] = useState('');
const [password,setpassword] = useState('');
const [redirect,setredirect] = useState(false);
const {setUserinfo}=useContext(userContext);
    const login=async(e)=>{
        e.preventDefault(); 
        const url="http://localhost:5000/login";
        const options={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username,password })
        }
        const response= await fetch(url,options);
        console.log(response)
         if(response.ok){
            response.json().then((data)=>{
               setUserinfo(data.username);
                setredirect(true);
            });
         }
         else{
            alert("Login Failed");
         }
    }
    if(redirect){
        return <Navigate to={'/'} />
    }
   return (
        <form className="login" onSubmit={login} >
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Enter User Name"
                value={username}
                onChange={(e) => {
                    setusername(e.target.value);
                }}
                required
            />
            <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e)=>{
                 setpassword(e.target.value);
                }}
            />
            <button>Login</button>
        </form>
    )
}

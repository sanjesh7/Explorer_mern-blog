import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { userContext } from "./userContext";

export default function Header() {
 const {Userinfo,setUserinfo}=useContext(userContext);
  useEffect(()=>{
   const url="http://localhost:5000/profile";
   const options={
    credentials: 'include',
   }
    fetch(url,options).then((response)=>{
           response.json().then((data)=>{
              setUserinfo(data.username);
           })
    });
  },[])


   const logout=()=>{
   const url= "http://localhost:5000/logout";
   const options={
    method: 'POST',
    credentials: 'include',
   }
    fetch(url,options)
     setUserinfo(null);
   }
   const username = Userinfo|| null;
    return (
      <header >
      <Link to="/" className="logo">Explorer</Link>
      <nav>
      {!username && (
        <>
         <Link to={'/login'}>Login</Link>
       <Link to={'/Register'}>Register</Link>
        </>
      )}
      
      {username && (
        <>
        <span>Hello {username}</span>
         <Link to={'/create'}>Create New Post</Link>
           <a href="/" onClick={logout}>Logut</a>
        </>
      )}
      
      </nav>
    </header>
    )
  }



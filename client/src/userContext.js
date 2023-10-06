import { createContext, useState } from "react";

export const userContext=createContext({});
const Userprovider=({children})=>{
   const[Userinfo,setUserinfo]=useState(null);
     return (
        <userContext.Provider value={{Userinfo,setUserinfo}}>
            {children}
        </userContext.Provider>
     );
}
export default Userprovider;

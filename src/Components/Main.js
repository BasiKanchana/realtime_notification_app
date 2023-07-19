import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import Cards from "./Cards";
import post  from "./Data";
 import { io } from "socket.io-client";


   const  Main = () => {

     const [ username , setUsername ] = useState("");
     const [ user , setUser ] = useState("");
     const[socket, setSocket] = useState(null); 

    useEffect(() => {
      setSocket(io("http://localhost:5000"));
    },[])

    useEffect(() => {
      socket?.emit("newUser", user);
    },[socket, user]);

  return(
       <div>
        {user?( 
         <>
         <div className="Nav_Card_section">
         <Navbar socket={socket} />
            {post.map((post) => (
            <Cards key={post.id} post={post} socket={socket} user={user}/>
        ))}

            <span className="Nav_username">{user}</span>
          </div>
            </>
           ):(
            <>

            <div className="constainer-fluid   input_section ">
             <h1 className="text-primary">Sign In</h1>
              <div className="input">
               <h4 className="mx-4">
                  <input type="text" className="Input_box" value={username} placeholder="username"  onChange={(e) => setUsername(e.target.value)}></input>
               </h4>
               <h4>
                  <button type="button" className="Login_button px-5 bg-primary" onClick={() => setUser(username)}>Login</button>
               </h4>
             </div>
            </div>
            </>
        )}

       </div>
    );
};
export default Main;

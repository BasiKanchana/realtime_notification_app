import React, { useEffect, useState } from 'react';

 function Navbar( { socket } ) {

  
const[notifications, setNotifications] = useState([]);
const[open, setOpen] = useState(false);

useEffect(() => {
    socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data]);
    });
},[socket]);

console.log(notifications);

const displayNotification = ({senderName , type}) => {
    let action;
    if(type === 1){
        action = "liked"
    }
    else if(type === 2){
        action = "commented"
    }
    else{
        action = "shared"
    }
    return(
        <span className='notification'>{`${senderName} ${action} your post`}</span>
    )
}
  return (
    <div  className=' container-fluid Navigation_App'>
      <div className='row'>
      <h3 className='col-lg-8 text-left px-3 py-4 Navigation_text '> Navigation App   </h3>
      <div className='col-lg-4 Navgation_icons ' onClick={() => setOpen(!open)}>
           <div className='text-danger Notify_icons '>
                  <i class="fa-solid fa-bell"></i>
                  <div className='counter'>{notifications.length}</div>
            </div>
           <div className='text-warning Notify_icons'>
                  <i class="fa-solid fa-comments"></i>
                 <div className='counter'>{notifications.length}</div>
           </div>
           <div className='text-secondary Notify_icons'>
                 <i class="fa-solid fa-gear"></i> 
                <div className='counter'>{notifications.length}</div>
           </div>
      </div>
      {open && 
            <div className='notification'>
            {notifications.map((n) => displayNotification(n))}
        </div>
        }
      </div>
     
    </div>
  )
}
export default Navbar;
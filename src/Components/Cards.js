import React from 'react';
import { useState } from 'react';
import comment from "./comment.png";
import share from "./share.png";
import info from "./info.png";
import heartRed from "./heartRed.png";
import heartIcon from "./heartIcon.png";

 function Cards( { post, socket, user }) {
  
  const [Liked , setLiked ] = useState(false);

  const handlenotification = (type) => {
    setLiked(true);
   socket && socket.emit("sendNotification", {
        'senderName': user,
        'recieverName': post.userName,
        'type':type,
    });
};
  return (
    <div className='Cards_ssection'>
      <div className='card_profile'>
        <img src={post.userImage}   className="user_profile" alt="userprofile" />
        <span className='userFullname'>{post.fullName}</span>
      </div>
      <img src={post.postImage}  className="user_Post_image"alt="userpost" />
   

     
      {Liked ?(
      <>
      <div className='post_interactions_icons'>
        <img src={heartRed}   className='interactions_icons'  alt="Redheart"  />
        <img src={comment}   className='interactions_icons'  style={{fontSize:"0px"}}alt="Redheart"  />
         <img src={share}   className='interactions_icons' alt="Redheart"  />
         <img src={info}  className='interactions_icons' alt="Redheart"  />
        
        </div>
      </> 
        ): (

       <>
        <div className='post_interactions_icons'>
         <img src={heartIcon}   className='interactions_icons' alt="Redheart" onClick={() => handlenotification(1)} />
         <img src={comment}   className='interactions_icons' alt="Redheart"  onClick={() => handlenotification(2)} />
         <img src={share}   className='interactions_icons' alt="Redheart" onClick={() => handlenotification(3)} />
         <img src={info}  className='interactions_icons' alt="Redheart"  />
        </div>
      </>
       
      )}
       
        
      </div>

   
  )
}
export default Cards;
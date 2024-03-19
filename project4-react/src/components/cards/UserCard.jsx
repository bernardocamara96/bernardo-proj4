import "./UserCard.css";
import { useState, useEffect } from "react";

export default function UserCard({ username, role, isDeleted, photoURL, handleClick, activeTrigger }) {
   const [isActive, setIsActive] = useState(false);

   function handleClickDiv() {
      handleClick(username);
      setTimeout(() => {
         setIsActive(true);
      }, 0.1);
   }

   useEffect(
      (event) => {
         setIsActive(false);
      },
      [activeTrigger]
   );

   return (
      <li
         className="user-item"
         onClick={handleClickDiv}
         style={{ border: isActive ? "solid black" : "solid transparent" }}
      >
         <div className="banner" style={{ backgroundColor: isDeleted ? "red" : "rgb(0, 60, 255)" }}>
            <h3>{username}</h3>
         </div>
         <div className="content" id="usercard-content">
            <img id="userPhoto" src={photoURL} alt="userPhoto" />
            <div className="user-role">
               {role === "developer" ? "Developer" : role === "scrumMaster" ? "Scrum Master" : "Product Owner"}
            </div>
         </div>
      </li>
   );
}

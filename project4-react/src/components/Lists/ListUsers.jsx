import "./StandardList.css";
import UserCard from "../cards/UserCard";
import { useState, useEffect } from "react";
import { loadUsers } from "../../utilities/services";
import { userStore } from "../../stores/userStore";
import {
   fetchUserDataByUsername,
   editOtherUser,
   deletePermanentlyUser,
   deleteTasksByUser,
} from "../../utilities/services";

export default function ListUsers() {
   const { token } = userStore.getState().user;
   const [users, setUsers] = useState([]);
   const [displayBackground, setDisplayBackground] = useState("none");
   const [imageBackground, setImageBackground] = useState("../../assets/placeholderform.png");
   const [photo, setPhoto] = useState("");
   const [usernameClicked, setUsernameClicked] = useState("");
   const [isDeleted, setIsDeleted] = useState(false);
   const [role, setRole] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [newEmail, setNewEmail] = useState("");
   const [activeTrigger, setActiveTrigger] = useState(false);
   const [changeTrigger, setChangeTrigger] = useState(false);
   const [statusChangeTrigger, setStatusChangeTrigger] = useState(false);
   const [statusChange, setStatusChange] = useState(false);
   const [buttonsDisabled, setButtonsDisabled] = useState(true);

   useEffect(() => {
      loadUsers(token).then((response) => {
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         return response.json().then((data) => {
            setUsers(data);
         });
      });
   }, [statusChangeTrigger]);

   function handleClick(username) {
      setDisplayBackground("");
      setImageBackground("none");
      setActiveTrigger(!activeTrigger);
      setChangeTrigger(false);
      setStatusChange(false);
      setButtonsDisabled(false);

      fetchUserDataByUsername(username, token).then((response) => {
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         return response.json().then((data) => {
            console.log(data);
            setPhoto(data.photoURL);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setPhone(data.phoneNumber);
            setRole(data.role);
            setIsDeleted(data.deleted);
            setUsernameClicked(username);
            setNewEmail(data.email);
         });
      });
   }
   function handleSubmit(e) {
      e.preventDefault();

      if (changeTrigger) {
         editOtherUser(
            token,
            usernameClicked,
            role,
            firstName,
            lastName,
            email,
            newEmail,
            phone,
            photo,
            isDeleted
         ).then((response) => {
            if (response.ok) {
               alert("User edited");
               setChangeTrigger(false);

               if (statusChange) {
                  setStatusChangeTrigger(!statusChangeTrigger);
                  setStatusChange(false);
               }
            }
         });
      } else alert("No changes were made");
   }

   function handleDelete() {
      if (confirm("Are you sure you want to delete this user?")) {
         deletePermanentlyUser(token, usernameClicked).then((response) => {
            if (response.ok) {
               alert("User deleted");
               setStatusChangeTrigger(!statusChangeTrigger);
            }
         });
      }
   }

   function handleDeleteTasks() {
      if (confirm("Are you sure you want to delete all tasks from this user?")) {
         deleteTasksByUser(token, usernameClicked).then((response) => {
            if (response.ok) {
               alert("Tasks deleted");
            }
         });
      }
   }
   return (
      <div className="mainBoard-settings mainBoard-settings-users" id="mainBoard-settings">
         <div className="user-list">
            <br />
            <br />
            <div className="box-container" id="box-users">
               <div className="col-user-list" id="col-users">
                  <div id="title-deleted-tasks">
                     <h3 id="user-list">User List</h3>
                  </div>
                  <div className="search-container">
                     <input type="text" id="userSearch" placeholder="🔍 Search" />
                  </div>
                  <div className="scrolable-ul" id="User_COLUMN">
                     <ul className="ul-users">
                        {console.log(users)}
                        {users.map(
                           (user) =>
                              user.username !== "admin" &&
                              user.username !== "deletedTasks" &&
                              user.username !== "developerTest" &&
                              user.username !== "scrumMasterTest" && (
                                 <UserCard
                                    key={user.username}
                                    username={user.username}
                                    isDeleted={user.deleted}
                                    role={user.role}
                                    photoURL={user.photoURL}
                                    handleClick={handleClick}
                                    activeTrigger={activeTrigger}
                                    statusChangeTrigger={statusChangeTrigger}
                                 />
                              )
                        )}
                     </ul>
                  </div>
               </div>
               <div className="centralform" id="centralform">
                  <form id="editProfileForm" style={{ backgroundImage: imageBackground }} onSubmit={handleSubmit}>
                     <div id="individual-user-info" style={{ textAlign: "center", display: displayBackground }}>
                        <div className="content" id="content">
                           <div id="userImageContainer" style={{ textAlign: "center" }}>
                              <img
                                 id="userImage"
                                 style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                                 src={photo}
                              />
                           </div>
                           <label id="username-label" htmlFor="username-field">
                              Username
                           </label>
                           <input
                              type="text"
                              name="username"
                              id="username-field"
                              maxLength="12"
                              value={usernameClicked}
                              disabled
                           />
                           <label id="phone-label" htmlFor="phone-field">
                              Phone
                           </label>
                           <input
                              type="text"
                              name="phone"
                              id="phone-field"
                              maxLength="35"
                              placeholder="Phone Number"
                              value={phone}
                              onChange={(e) => {
                                 setPhone(e.target.value);
                                 setChangeTrigger(true);
                              }}
                           />
                           <label id="email-label" htmlFor="email-field">
                              Email
                           </label>
                           <input
                              type="text"
                              name="email"
                              id="email-field"
                              maxLength="35"
                              placeholder="email"
                              value={newEmail}
                              onChange={(e) => {
                                 setNewEmail(e.target.value);
                                 setChangeTrigger(true);
                              }}
                           />
                           <label id="first-name-label" htmlFor="firstname-field">
                              First Name
                           </label>
                           <input
                              type="text"
                              name="first-name"
                              id="firstname-field"
                              maxLength="35"
                              placeholder="First name"
                              value={firstName}
                              onChange={(e) => {
                                 setFirstName(e.target.value);
                                 setChangeTrigger(true);
                              }}
                           />
                           <label id="last-name-label" htmlFor="lastname-field">
                              Last Name
                           </label>
                           <input
                              type="text"
                              name="last-name"
                              id="lastname-field"
                              maxLength="35"
                              placeholder="last name"
                              value={lastName}
                              onChange={(e) => {
                                 setLastName(e.target.value);
                                 setChangeTrigger(true);
                              }}
                           />
                           <label id="photo-label" htmlFor="photo-field">
                              Photography
                           </label>
                           <input
                              type="text"
                              name="photo"
                              id="photo-field"
                              maxLength="500"
                              placeholder="new photo"
                              value={photo}
                              onChange={(e) => {
                                 setPhoto(e.target.value);
                                 setChangeTrigger(true);
                                 setStatusChange(true);
                              }}
                           />

                           <label id="role-label" htmlFor="role-field">
                              Role
                           </label>
                           <select
                              name="role"
                              id="role-field"
                              value={role}
                              onChange={(e) => {
                                 setRole(e.target.value);
                                 setChangeTrigger(true);
                                 setStatusChange(true);
                              }}
                           >
                              <option value="developer">Developer</option>
                              <option value="scrumMaster">Scrum Master</option>
                              <option value="productOwner">Product Owner</option>
                           </select>
                           <label id="inactivate-label" htmlFor="inactivate-field">
                              State
                           </label>
                           <select
                              name="inactivate"
                              id="inactivate-field"
                              value={isDeleted}
                              onChange={(e) => {
                                 setIsDeleted(e.target.value);
                                 setChangeTrigger(true);
                                 setStatusChange(true);
                              }}
                           >
                              <option value="false">Active</option>
                              <option value="true">Inactive</option>
                           </select>
                           <div id="edit-submitDiv">
                              <button type="submit" id="edit-submit">
                                 Submit
                              </button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
               <div className="other-options-user">
                  <div className="other-functions-byUser">
                     <button id="delete-permanently" onClick={handleDelete} disabled={buttonsDisabled}>
                        Permanently delete
                     </button>
                     <button id="delete-task-by-user" onClick={handleDeleteTasks} disabled={buttonsDisabled}>
                        Delete Tasks
                     </button>
                     <button id="add-user" disabled={buttonsDisabled}>
                        Add User
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

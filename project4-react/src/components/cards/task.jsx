import trashIcon from "../../assets/trashCanIcon.png";
import "./task.css";
import { deleteListener } from "../../utilities/services";
import { userStore, usernameStore } from "../../stores/userStore";
import { useState } from "react";
import { updateTaskStatus, deleteTask, restaureTask } from "../../utilities/services";

export default function Task({
   id,
   title,
   username_author,
   category_type,
   description,
   priority,
   buttonVisibility,
   setFetchTrigger,
   status,
}) {
   const user = userStore.getState().user;
   const username = usernameStore.getState().username;

   const handleDelete = (e) => {
      e.preventDefault();

      if (status === "non-draggable") {
         if (!window.confirm("Are you sure you want to permanently delete this task?")) {
            return;
         }
         deleteTask(id, user.token).then((response) => {
            if (response.ok) {
               setFetchTrigger((prev) => !prev);
            } else {
               console.error("Falha ao eliminar a tarefa:", response.statusText);
            }
         });
      } else if (!window.confirm("Are you sure you want to delete this task?")) {
         return;
      }
      deleteListener(user.token, id).then((response) => {
         if (response.ok) {
            setFetchTrigger((prev) => !prev);
         } else {
            console.error("Falha ao eliminar a tarefa:", response.statusText);
         }
      });
   };

   const handleNextButton = (e) => {
      var newStatus = status === "TO DO" ? 200 : status === "DOING" ? 300 : null;

      updateTaskStatus(user.token, id, newStatus).then((response) => {
         if (response.ok) {
            setFetchTrigger((prev) => !prev);
         } else {
            console.error("Falha ao atualizar o status da tarefa:", response.statusText);
         }
      });
   };
   const handlePreviousButton = (e) => {
      var newStatus = status === "DONE" ? 200 : status === "DOING" ? 100 : null;

      updateTaskStatus(user.token, id, newStatus).then((response) => {
         if (response.ok) {
            setFetchTrigger((prev) => !prev);
         } else {
            console.error("Falha ao atualizar o status da tarefa:", response.statusText);
         }
      });
   };

   const handleRestaure = (e) => {
      if (confirm("Are you sure you want to restore this task?")) {
         restaureTask(id, user.token).then((response) => {
            if (response.ok) {
               setFetchTrigger((prev) => !prev);
            } else {
               console.error("Falha ao atualizar o status da tarefa:", response.statusText);
            }
         });
      }
   };
   return (
      <>
         <div
            className="banner"
            style={{
               backgroundColor:
                  status === "TO DO"
                     ? "rgb(0, 60, 255, 0.7)"
                     : status === "DOING"
                     ? "rgb(255,0,0,0.7)"
                     : status === "DONE" && "rgb(0,128,0,0.65)",
            }}
         >
            <h3>{title.substring(0, 10)}</h3>
            <div className="category_author">
               <span style={{ marginRight: "30px" }}>{username_author.substring(0, 10)}</span>
               <span>{category_type.substring(0, 8)}</span>
            </div>
         </div>
         <div className="lower-side-task">
            <div className="content">
               <p id="description-task">
                  {description.length > 42 ? description.substring(0, 38) + "..." : description}
               </p>
            </div>

            <div
               className="priority-div"
               style={{ backgroundColor: priority === 1 ? "green" : priority === 2 ? "yellow" : "red" }}
            ></div>

            <div
               className="content_buttons"
               style={{
                  marginLeft:
                     status === "TO DO"
                        ? username_author === username || user.role === "productOwner" || user.role === "scrumMaster"
                           ? "260px"
                           : "285px"
                        : status === "DOING"
                        ? username_author === username || user.role === "productOwner" || user.role === "scrumMaster"
                           ? "235px"
                           : "260px"
                        : status === "DONE"
                        ? username_author === username || user.role === "productOwner" || user.role === "scrumMaster"
                           ? "260px"
                           : "285px"
                        : status === "non-draggable"
                        ? "200px"
                        : null,
               }}
            >
               {status === "TO DO" || status == "non-draggable" ? null : (
                  <button style={{ visibility: buttonVisibility }} children="<" onClick={handlePreviousButton}></button>
               )}

               {status === "non-draggable" && user.role === "productOwner" && (
                  <button style={{ visibility: buttonVisibility }} onClick={handleRestaure}>
                     &#x21bb;
                  </button>
               )}
               {((status != "non-draggable" &&
                  (username_author === username || user.role === "productOwner" || user.role === "scrumMaster")) ||
                  (status === "non-draggable" && user.role === "productOwner")) && (
                  <button style={{ visibility: buttonVisibility }} onClick={handleDelete}>
                     <img src={trashIcon} alt="del" />
                  </button>
               )}

               {status === "DONE" || status === "non-draggable" ? null : (
                  <button style={{ visibility: buttonVisibility }} children=">" onClick={handleNextButton}></button>
               )}
            </div>
         </div>
      </>
   );
}

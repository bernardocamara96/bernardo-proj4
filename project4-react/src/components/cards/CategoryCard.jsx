import "./CategoryCard.css";
import trashIcon from "../../assets/trashCanIcon.png";
import { tasksByCategory, deleteCategory, editCategory } from "../../utilities/services";
import { useEffect, useState } from "react";
import { userStore } from "../../stores/userStore";

export default function CategoryCard({ category_type }) {
   const [tasksNumber, setTasksNumber] = useState(0);
   const user = userStore.getState().user;
   const [category_typeValue, setCategory_typeValue] = useState(category_type);
   const [atualCategory_type, setAtualCategory_type] = useState(category_type);
   const [removed, setRemoved] = useState(false);

   useEffect(() => {
      tasksByCategory(category_type, user.token).then((response) => {
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         return response.json().then((data) => {
            setTasksNumber(data);
         });
      });
   }, [tasksNumber]);

   function handleDisabled() {
      if (category_typeValue === atualCategory_type) {
         return true;
      }
      return false;
   }

   function handleDelete() {
      if (confirm("Are you sure you want to delete this category?")) {
         deleteCategory(atualCategory_type, user.token).then((response) => {
            if (!response.ok) {
               throw new Error("Network response was not ok");
            } else {
               console.log("Category deleted");
               setRemoved(true);
            }
         });
      }
   }

   function handleEdit() {
      if (category_typeValue !== "" || category_typeValue !== null) {
         editCategory(atualCategory_type, category_typeValue, user.token).then((response) => {
            if (response.ok) {
               setAtualCategory_type(category_typeValue);
               alert("Category edited");
            } else if (response.status == 400) {
               alert("Category already exists");
            } else {
               alert("Error adding category");
            }
         });
      }
   }

   return (
      <>
         {removed ? null : (
            <li className="task-item-deleted column-itemWidth">
               <div className="contentCategories">
                  <input
                     className="categoriesTitle-style"
                     value={category_typeValue}
                     onChange={(e) => setCategory_typeValue(e.target.value)}
                     style={{ backgroundColor: handleDisabled() ? "lightgray" : "white" }}
                  />

                  {user.role === "productOwner" && (
                     <button className="button-edit" disabled={handleDisabled()} onClick={handleEdit}>
                        &#128190;
                     </button>
                  )}
               </div>
               <span className="numberOfTasks">{tasksNumber}</span>

               {user.role === "productOwner" && (
                  <button id="deleteBtn" onClick={handleDelete}>
                     <img id="imgTrash" src={trashIcon} alt="delete" />
                  </button>
               )}
            </li>
         )}
      </>
   );
}

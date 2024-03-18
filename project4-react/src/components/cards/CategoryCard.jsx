import "./CategoryCard.css";
import trashIcon from "../../assets/trashCanIcon.png";
import { tasksByCategory } from "../../utilities/services";
import { useEffect, useState } from "react";
import { userStore } from "../../stores/userStore";

export default function CategoryCard({ category_type }) {
   const [tasksNumber, setTasksNumber] = useState(0);
   const user = userStore.getState().user;

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

   return (
      <li className="task-item-deleted column-itemWidth">
         <div className="contentCategories">
            <input className="categoriesTitle-style" value={category_type} />
            <button className="button-edit">&#128190;</button>
         </div>
         <span className="numberOfTasks">{tasksNumber}</span>
         <button id="deleteBtn">
            <img id="imgTrash" src={trashIcon} alt="delete" />
         </button>
      </li>
   );
}

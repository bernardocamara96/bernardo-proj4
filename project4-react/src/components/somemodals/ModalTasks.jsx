import "./ModalTasks.css";
import { getAllCategories, addTaskBE } from "../../utilities/services";
import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";

export default function ModalTasks({ token, setModalVisibility, setFetchTrigger }) {
   const [categories, setCategories] = useState([]);
   const [taskTitle, setTaskTitle] = useState("");
   const [taskDescription, setTaskDescription] = useState("");
   const [taskPriority, setTaskPriority] = useState(1);
   const [taskStartDate, setTaskStartDate] = useState("");
   const [taskEndDate, setTaskEndDate] = useState("");
   const [category_type, setCategory_type] = useState("No_Category");

   useEffect(() => {
      getAllCategories(token)
         .then((response) => {
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            return response.json();
         })
         .then(function (data) {
            setCategories(data);
         })

         .catch((error) => {
            console.error("Error fetching data:", error);
         });
   }, []);
   const handleSubmit = (e) => {
      e.preventDefault();
      addTaskBE(token, taskTitle, taskDescription, taskPriority, taskStartDate, taskEndDate, category_type).then(
         function (response) {
            if (response.status == 201) {
               alert("task is added successfully :)");
               setTaskTitle("");
               setTaskDescription("");
               setTaskPriority(1);
               setTaskStartDate("");
               setTaskEndDate("");
               setCategory_type("No_Category");
               setFetchTrigger((prev) => !prev);
               setModalVisibility(false);
            } else if (response.status == 401) {
               alert("username not loged in");
            } else if (response.status == 403) {
               alert("Acess Denied");
            }
         }
      );
   };

   return (
      <div>
         <div className="tasksModal" id="tasksModalCreate">
            <form id="taskForm">
               <div className="row-task">
                  <h2 id="add-task">Add Task</h2>
               </div>
               <ModalContent
                  categories={categories}
                  taskTitle={taskTitle}
                  taskDescription={taskDescription}
                  category_type={category_type}
                  taskPriority={taskPriority}
                  taskStartDate={taskStartDate}
                  taskEndDate={taskEndDate}
                  setTaskTitle={setTaskTitle}
                  setTaskDescription={setTaskDescription}
                  setTaskPriority={setTaskPriority}
                  setTaskStartDate={setTaskStartDate}
                  setTaskEndDate={setTaskEndDate}
                  setCategory_type={setCategory_type}
                  modalType={"create"}
               />
               <div className="btns-div">
                  <div className="row-submit">
                     <input id="save-task" type="submit" value="Save Task" onClick={handleSubmit} />
                  </div>
                  <div className="row-cancel">
                     <button id="cancel-task" onClick={() => setModalVisibility(false)}>
                        Cancel
                     </button>
                  </div>
               </div>
            </form>
         </div>
         <div className="modalBackground" onClick={() => setModalVisibility(false)}></div>
      </div>
   );
}

import Task from "./task";
import { useState } from "react";

export default function NonDraggableTask({
   id,
   title,
   username_author,
   category_type,
   description,
   priority,
   startDate,
   endDate,
   onDoubleClick,
   setFetchTrigger,
}) {
   const [buttonVisibility, setButtonVisibility] = useState("hidden");
   const handleDoubleClick = () => {
      onDoubleClick({ id, title, description, username_author, category_type, priority, startDate, endDate });
   };
   return (
      <li
         className="task-item"
         onDoubleClick={handleDoubleClick}
         onMouseEnter={() => setButtonVisibility("visible")}
         onMouseLeave={() => setButtonVisibility("hidden")}
      >
         <Task
            id={id}
            title={title}
            username_author={username_author}
            category_type={category_type}
            description={description}
            priority={priority}
            buttonVisibility={buttonVisibility}
            setFetchTrigger={setFetchTrigger}
            onDoubleClick={handleDoubleClick}
            status={"non-draggable"}
         />
      </li>
   );
}

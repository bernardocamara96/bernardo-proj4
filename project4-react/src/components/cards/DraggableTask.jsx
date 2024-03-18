import { Draggable } from "react-beautiful-dnd";
import Task from "./task";
import "./task";
import { useState } from "react";

export default function DraggableTask({
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
   status,
   index,
}) {
   const [buttonVisibility, setButtonVisibility] = useState("hidden");
   const handleDoubleClick = () => {
      onDoubleClick({ id, title, description, username_author, category_type, priority, startDate, endDate });
   };

   return (
      <Draggable draggableId={id.toString()} index={index}>
         {(provided) => (
            <li
               className="task-item"
               onDoubleClick={handleDoubleClick}
               onMouseEnter={() => setButtonVisibility("visible")}
               onMouseLeave={() => setButtonVisibility("hidden")}
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
            >
               <Task
                  id={id}
                  title={title}
                  username_author={username_author}
                  category_type={category_type}
                  description={description}
                  priority={priority}
                  startDate={startDate}
                  endDate={endDate}
                  onDoubleClick={handleDoubleClick}
                  setFetchTrigger={setFetchTrigger}
                  status={status}
                  buttonVisibility={buttonVisibility}
               />
            </li>
         )}
      </Draggable>
   );
}

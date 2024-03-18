import "./AddCategory.css";
import { addCategory } from "../../utilities/services";
import { useState } from "react";
import { userStore } from "../../stores/userStore";

export default function AddCategory({ setCategoryList }) {
   const [category, setCategory] = useState("");
   const user = userStore.getState().user;

   function handleClick() {
      if (category !== "" || category !== null) {
         addCategory(category, user.token).then((response) => {
            if (response.ok) {
               return response.json().then((response) => {
                  setCategoryList((prevList) => [...prevList, response]);
                  setCategory("");
               });
            } else if (response.status == 400) {
               alert("Category already exists");
               setCategory("");
            } else {
               alert("Error adding category");
            }
         });
      }
   }
   return (
      <div id="addCategory-id">
         <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
         <button onClick={handleClick}>Add Category</button>
      </div>
   );
}

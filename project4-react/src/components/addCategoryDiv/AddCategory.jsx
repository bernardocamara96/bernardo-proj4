import "./AddCategory.css";
import { addCategory } from "../../utilities/services";
import { useState } from "react";
import { userStore } from "../../stores/userStore";
import alertStore from "../../stores/alertStore";

export default function AddCategory({ setCategoryList }) {
   const [category, setCategory] = useState("");
   const user = userStore.getState().user;

   function handleAlert(message, error) {
      alertStore.getState().setMessage(message);
      alertStore.getState().setVisible(true);
      alertStore.getState().setError(error);
   }
   function handleClick() {
      if (category !== "" || category !== null) {
         addCategory(category, user.token).then((response) => {
            if (response.ok) {
               return response.json().then((response) => {
                  setCategoryList((prevList) => [...prevList, response]);
                  setCategory("");

                  handleAlert("Category added successfully!", false);
               });
            } else if (response.status == 400) {
               handleAlert("Category already exists", true);

               setCategory("");
            } else {
               handleAlert("Error adding category", true);
            }
         });
      }
   }
   return (
      <>
         {user.role === "productOwner" && (
            <div id="addCategory-id">
               <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
               <button onClick={handleClick}>Add Category</button>
            </div>
         )}
      </>
   );
}

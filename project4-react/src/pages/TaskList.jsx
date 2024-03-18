import StandardList from "../components/Lists/StandardList";
import HeaderScrum from "../components/Headers/HeaderScrum";
import { useState, useEffect } from "react";
import { userStore } from "../stores/userStore";
import { fetchPhotoNameAndRedirect } from "../utilities/services";
import Footer from "../components/Footers/Footer";

export default function TaskList() {
   const user = userStore.getState().user;
   const [photo, setPhoto] = useState("");
   const [username, setUsername] = useState("");

   useEffect(() => {
      if (user.token) {
         fetchPhotoNameAndRedirect(user.token)
            .then((response) => {
               if (!response.ok) {
                  throw new Error("Network response was not ok");
               }
               return response.json();
            })
            .then(function (data) {
               setPhoto(data.photoUrl);
               setUsername(data.name);
            })
            .catch((error) => {
               console.error("Error fetching data:", error);
            });
      }
   });
   return (
      <>
         <HeaderScrum username={username} userPhoto={photo} />
         <StandardList id="task-list" type="taskList" />
         <Footer />
      </>
   );
}

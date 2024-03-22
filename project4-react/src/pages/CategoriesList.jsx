import StandardList from "../components/Lists/StandardList";
import HeaderScrum from "../components/Headers/HeaderScrum";
import { useState, useEffect } from "react";
import { userStore } from "../stores/userStore";
import { fetchPhotoNameAndRedirect, loadCategories } from "../utilities/services";
import Footer from "../components/Footers/Footer";
import AsideMenu from "../components/Menus/AsideMenu";
import AlertsMessage from "../components/somemodals/messagesModal/AlertsMessage";
import ConfirmMessage from "../components/somemodals/messagesModal/ConfirmMessage";

export default function CategoriesList() {
   const user = userStore.getState().user;
   const [photo, setPhoto] = useState("");
   const [username, setUsername] = useState("");
   const updateRole = userStore((state) => state.updateRole);

   useEffect(() => {
      if (user.token) {
         fetchPhotoNameAndRedirect(user.token)
            .then((response) => {
               if (!response.ok) {
                  if (response.status === 403) navigate("/", { replace: true });
                  throw new Error("Network response was not ok");
               }
               return response.json();
            })
            .then(function (data) {
               setPhoto(data.photoUrl);
               setUsername(data.name);
               updateRole(data.role);
            })
            .catch((error) => {
               console.error("Error fetching data:", error);
            });
      }
   });

   return (
      <>
         <HeaderScrum username={username} userPhoto={photo} />
         <div id="main-taskList">
            <AsideMenu type={user.role} />
            <StandardList type="categoriesList" />
         </div>
         <Footer />
         <AlertsMessage />
         <ConfirmMessage />
      </>
   );
}

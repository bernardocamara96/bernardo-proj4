import HeaderScrum from "../components/Headers/HeaderScrum";
import AsideMenu from "../components/Menus/AsideMenu";
import { useState, useEffect } from "react";
import { userStore } from "../stores/userStore";
import Footer from "../components/Footers/Footer";
import { fetchPhotoNameAndRedirect } from "../utilities/services";
import ListUsers from "../components/Lists/ListUsers";
import AlertsMessage from "../components/somemodals/messagesModal/AlertsMessage";
import ConfirmMessage from "../components/somemodals/messagesModal/ConfirmMessage";

export default function UsersList() {
   const [photo, setPhoto] = useState("");
   const [username, setUsername] = useState("");
   const user = userStore.getState().user;
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
            <ListUsers />
         </div>
         <Footer />
         <AlertsMessage />
         <ConfirmMessage />
      </>
   );
}

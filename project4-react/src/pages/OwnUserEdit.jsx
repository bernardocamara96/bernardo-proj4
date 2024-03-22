import { userStore } from "../stores/userStore";
import EditOwnProfile from "../components/Forms/EditOwnProfile";
import HeaderScrum from "../components/Headers/HeaderScrum";
import Footer from "../components/Footers/Footer";
import { useState, useEffect } from "react";
import { fetchPhotoNameAndRedirect } from "../utilities/services";
import AlertsMessage from "../components/somemodals/messagesModal/AlertsMessage";

export default function OwnUserEdit() {
   const user = userStore.getState().user;
   const [username, setUsername] = useState("");
   const [photo, setPhoto] = useState("");

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
            })
            .catch((error) => {
               console.error("Error fetching data:", error);
            });
      }
   }, []);
   return (
      <>
         <HeaderScrum username={username} userPhoto={photo} />
         <EditOwnProfile />
         <Footer />
         <AlertsMessage />
      </>
   );
}

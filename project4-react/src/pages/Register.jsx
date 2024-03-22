import RegisterForm from "../components/Forms/RegisterForm";
import Header from "../components/Headers/LoginHeader";
import Footer from "../components/Footers/Footer";
import { useLocation } from "react-router-dom";
import HeaderScrum from "../components/Headers/HeaderScrum";
import { useState, useEffect } from "react";
import { userStore } from "../stores/userStore";
import { fetchPhotoNameAndRedirect } from "../utilities/services";
import AlertsMessage from "../components/somemodals/messagesModal/AlertsMessage";
import { useNavigate } from "react-router-dom";

export default function Register() {
   const location = useLocation();
   const { type } = location.state || {};
   const user = userStore.getState().user;
   const navigate = useNavigate();
   const [photo, setPhoto] = useState("");
   const [username, setUsername] = useState("");

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
               if (type === "productOwnerRegister") {
                  if (data.role !== "productOwner") navigate("/", { replace: true });
               }
            })
            .catch((error) => {
               console.error("Error fetching data:", error);
            });
      }
   }, []);
   return (
      <>
         {type === "normalRegister" ? <Header /> : <HeaderScrum username={username} userPhoto={photo} />}
         <RegisterForm type={type} />;
         <Footer />
         <AlertsMessage />
      </>
   );
}

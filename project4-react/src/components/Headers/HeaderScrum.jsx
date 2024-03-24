import "./Header.css";
import appLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/userStore";
import filterStore from "../../stores/filterStore";
import alertStore from "../../stores/alertStore";

export default function HeaderScrum({ username, userPhoto }) {
   const navigate = useNavigate();
   const { updateUsernameFilter, updateCategoryFilter } = filterStore.getState();
   const { setConfirmMessage, setConfirmVisible, setConfirmCallback } = alertStore();

   const handleAction = (message, callback) => {
      setConfirmMessage(message);
      setConfirmVisible(true);
      setConfirmCallback(callback);
   };

   const user = userStore.getState().user;
   function clickOnExit() {
      handleAction("Are you sure you want exit the app?", () => {
         updateUsernameFilter("default");
         updateCategoryFilter("default");
         navigate("/", { replace: true });
         sessionStorage.removeItem("user-storage");
      });
   }
   return (
      <header>
         <img id="logo" src={appLogo} alt="IMG" onClick={() => navigate("/scrum", { replace: true })} />

         <div className="topnav">
            <a id="nav-home" className="active" onClick={() => navigate("/scrum", { replace: true })}>
               Homepage
            </a>

            <a id="nav-exit" onClick={clickOnExit}>
               Exit
            </a>
         </div>

         <div id="right-aligned" onClick={() => navigate("/editProfile", { replace: true })}>
            <a>
               <h4>
                  <span id="usernameDisplay">{username}</span>
               </h4>
            </a>
         </div>

         <a id="userPhotolink" onClick={() => navigate("/editProfile", { replace: true })}>
            <div className="user-photo-div">
               <img id="userPhoto" src={userPhoto} alt="" />
            </div>
         </a>
      </header>
   );
}

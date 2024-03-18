import "./Header.css";
import appLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/userStore";

export default function HeaderScrum({ username, userPhoto }) {
   const navigate = useNavigate();

   const user = userStore.getState().user;
   function clickOnExit() {
      if (!window.confirm("Are you sure you want exit the app?")) {
         return;
      }
      navigate("/", { replace: true });
      sessionStorage.removeItem("user-storage");
   }
   return (
      <header>
         <img id="logo" src={appLogo} alt="IMG" onClick={() => navigate("/scrum", { replace: true })} />

         <div className="topnav">
            <a id="nav-home" className="active" onClick={() => navigate("/scrum", { replace: true })}>
               Homepage
            </a>
            <a id="nav-retro">Retrospective</a>
            <a id="nav-sett">Settings</a>
            <a id="nav-exit" onClick={clickOnExit}>
               Exit
            </a>
         </div>

         <div id="right-aligned">
            <a>
               <h4>
                  <span id="usernameDisplay">{username}</span>
               </h4>
            </a>
         </div>

         <a id="userPhotolink" href="editProfile.html">
            <div className="user-photo-div">
               <img id="userPhoto" src={userPhoto} alt="" />
            </div>
         </a>
      </header>
   );
}

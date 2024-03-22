import AsideMenu from "../components/Menus/AsideMenu.jsx";
import HeaderScrum from "../components/Headers/HeaderScrum.jsx";
import Footer from "../components/Footers/Footer.jsx";
import ColumnsContainer from "../components/columns/ColumnsContainer.jsx";
import "../main.css";
import { useEffect } from "react";
import { fetchPhotoNameAndRedirect } from "../utilities/services";
import { useState } from "react";
import { userStore } from "../stores/userStore";
import Filters from "../components/Filters/Filters.jsx";
import { useNavigate } from "react-router-dom";
import AlertsMessage from "../components/somemodals/messagesModal/AlertsMessage.jsx";
import ConfirmMessage from "../components/somemodals/messagesModal/ConfirmMessage.jsx";

export default function Scrum() {
   const user = userStore.getState().user;
   const updateRole = userStore((state) => state.updateRole);
   const [fetchTrigger, setFetchTrigger] = useState(false);
   const navigate = useNavigate();
   const [searchTermHome, setSearchTermHome] = useState("");
   const [photo, setPhoto] = useState("");
   const [username, setUsername] = useState("");
   const [TODOtasks, setTODOtasks] = useState([]);
   const [DOINGtasks, setDOINGtasks] = useState([]);
   const [DONEtasks, setDONEtasks] = useState([]);

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
               updateRole(data.role);
               setPhoto(data.photoUrl);
               setUsername(data.name);
            })
            .catch((error) => {
               console.error("Error fetching data:", error);
            });
      } else {
         navigate("/", { replace: true });
      }
   });

   return (
      <>
         <HeaderScrum username={username} userPhoto={photo} />
         <main id="scrumMain">
            {user.role === "developer" ? null : <AsideMenu type={user.role} />}
            <div id="scrum-content">
               <div className="search-container-homepage" id="search-container-homepage">
                  <input
                     type="text"
                     id="taskSearchHomepage"
                     placeholder="🔍 Search tasks by title or description"
                     value={searchTermHome}
                     onChange={(e) => setSearchTermHome(e.target.value)}
                     style={{ marginLeft: user.role === "developer" && "390px" }}
                  />
                  {user.role === "developer" ? null : (
                     <Filters
                        id="filters-scrum"
                        tasks={{ TODOtasks, DOINGtasks, DONEtasks }}
                        setTasks={{ setTODOtasks, setDOINGtasks, setDONEtasks }}
                        fetchTrigger={fetchTrigger}
                        setFetchTrigger={setFetchTrigger}
                     />
                  )}
               </div>
               <ColumnsContainer
                  token={user.token}
                  tasks={{ TODOtasks, DOINGtasks, DONEtasks }}
                  setTasks={{ setTODOtasks, setDOINGtasks, setDONEtasks }}
                  fetchTrigger={fetchTrigger}
                  setFetchTrigger={setFetchTrigger}
                  searchTerm={searchTermHome}
               />
            </div>
         </main>
         <Footer />
         <AlertsMessage />
         <ConfirmMessage />
      </>
   );
}

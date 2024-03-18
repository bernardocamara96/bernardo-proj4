import "./Filters.css";
import {
   loadUsers,
   createUsernameFilter,
   tasksByCategory,
   loadCategories,
   loadTasks,
   loadTasksByUser,
   loadTasksByCategory,
   loadTasksByUserAndCategory,
   orderTasks,
} from "../../utilities/services";
import { useEffect, useState } from "react";
import { userStore } from "../../stores/userStore";

export default function Filters({ tasks, setTasks, fetchTrigger, setFetchTrigger }) {
   const user = userStore.getState().user;

   const [usersSelect, setUsersSelect] = useState([]);
   const [categoriesSelect, setCategoriesSelect] = useState([]);
   const [seletectedUsername, setSelectedUsername] = useState("default");
   const [selectedCategory, setSelectedCategory] = useState("default");

   const { TODOtasks, DOINGtasks, DONEtasks } = tasks;
   const { setTODOtasks, setDOINGtasks, setDONEtasks } = setTasks;
   console.log(setTODOtasks);

   useEffect(() => {
      const fetchUsernames = async () => {
         try {
            const response = await loadUsers(user.token);
            if (response.ok) {
               const data = await response.json();
               const validUsers = [];
               for (const checkUser of data) {
                  const response = await createUsernameFilter(checkUser.username, user.token);
                  if (response.ok) {
                     const responseData = await response.json();
                     if (responseData > 0) {
                        validUsers.push(checkUser.username);
                     }
                  }
               }
               setUsersSelect(validUsers);
            }
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      const fetchCategories = async () => {
         try {
            const response = await loadCategories(user.token);
            if (response.ok) {
               const data = await response.json();
               const validCategories = [];
               for (const checkCategory of data) {
                  const response = await tasksByCategory(checkCategory.type, user.token);
                  if (response.ok) {
                     const responseData = await response.json();
                     if (responseData > 0) {
                        validCategories.push(checkCategory.type);
                     }
                  }
               }
               setCategoriesSelect(validCategories);
            }
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      fetchUsernames();
      fetchCategories();
   }, []);

   function cleanFilters() {
      setSelectedUsername("default");
      setSelectedCategory("default");
      setFetchTrigger((prev) => !prev);
   }

   function handleClick() {
      if (seletectedUsername === "default" && selectedCategory === "default") {
         loadTasks(user.token).then((response) => {
            if (response.ok) {
               response.json().then((tasksFromServer) => {
                  const tasks = orderTasks(tasksFromServer);

                  auxiliarFilterFunction(tasks);
               });
            } else if (response.status === 403) {
               alert("You don't have permission to access this page. Please login again.");
            } else {
               console.error("Falha ao carregar tarefas:", response.statusText);
            }
         });
      } else if (seletectedUsername !== "default" && selectedCategory === "default") {
         loadTasksByUser(user.token, seletectedUsername).then((response) => {
            if (response.ok) {
               response.json().then((tasksFromServer) => {
                  const tasks = orderTasks(tasksFromServer);

                  auxiliarFilterFunction(tasks);
               });
            } else if (response.status === 403) {
               alert("You don't have permission to access this page. Please login again.");
            } else {
               console.error("Falha ao carregar tarefas:", response.statusText);
            }
         });
      } else if (seletectedUsername === "default" && selectedCategory !== "default") {
         loadTasksByCategory(user.token, selectedCategory).then((response) => {
            if (response.ok) {
               response.json().then((tasksFromServer) => {
                  const tasks = orderTasks(tasksFromServer);

                  auxiliarFilterFunction(tasks);
               });
            } else if (response.status === 403) {
               alert("You don't have permission to access this page. Please login again.");
            } else {
               console.error("Falha ao carregar tarefas:", response.statusText);
            }
         });
      } else {
         loadTasksByUserAndCategory(user.token, seletectedUsername, selectedCategory).then((response) => {
            if (response.ok) {
               response.json().then((tasksFromServer) => {
                  const tasks = orderTasks(tasksFromServer);
                  auxiliarFilterFunction(tasks);
               });
            } else if (response.status === 403) {
               alert("You don't have permission to access this page. Please login again.");
            } else {
               console.error("Falha ao carregar tarefas:", response.statusText);
            }
         });
      }
   }

   function auxiliarFilterFunction(tasks) {
      const componentsByStatus = {
         TODO: tasks.filter((task) => task.status === 100),
         DOING: tasks.filter((task) => task.status === 200),
         DONE: tasks.filter((task) => task.status === 300),
      };

      setTODOtasks(componentsByStatus.TODO);
      setDOINGtasks(componentsByStatus.DOING);
      setDONEtasks(componentsByStatus.DONE);
   }
   return (
      <div id="filter-section">
         <select
            className="homepage-filters"
            id="user-filter"
            value={seletectedUsername}
            onChange={(e) => setSelectedUsername(e.target.value)}
         >
            <option value="default">All Users</option>
            {usersSelect.map((username) => (
               <option key={username} value={username}>
                  {username}
               </option>
            ))}
         </select>
         <select
            className="homepage-filters"
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
         >
            <option value="default">All Categories</option>
            {categoriesSelect.map((category) => (
               <option key={category} value={category}>
                  {category}
               </option>
            ))}
         </select>
         <button className="btn-filters" id="filter-btn" onClick={handleClick}>
            Apply Filter
         </button>
         <button className="btn-filters" id="clean-filter-btn" onClick={cleanFilters}>
            Clean Filter
         </button>
      </div>
   );
}
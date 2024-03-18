import * as encryptation from "./encryptation.js";

const baseURL = "http://localhost:8080/bernardo-proj4/rest/";

async function registerUser(user) {
   try {
      const response = await fetch(`${baseURL}user/add`, {
         method: "POST",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      });

      if (response.ok) {
         // Resolve with the parsed JSON data
         return response;
      } else {
         // If the response status is not in the success range, reject the promise with the status code
         return Promise.reject(response.status);
      }
   } catch (error) {
      // Handle network errors or other exceptions
      return Promise.reject(error);
   }
}

async function loginAttempt(username, password) {
   let userLogin = {
      username: username,
      password: encryptation.encryptPassword(password),
   };

   return await fetch(`${baseURL}user/login`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
   });
}

async function fetchPhotoNameAndRedirect(token) {
   return await fetch(`${baseURL}user/getphotoandname`, {
      method: "GET",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         token: token,
      },
   });
}

async function getAllCategories(token) {
   return await fetch(`${baseURL}category/all`, {
      method: "GET",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         token: token,
      },
   });
}

async function addTaskBE(token, title, description, priority, startDate, endDate, category_type) {
   const TODO_COLUMN = 100;
   let task = {
      // cria um objeto task
      title: title,
      description: description,
      priority: priority,
      status: TODO_COLUMN,
   };
   if (startDate) {
      task.startDate = startDate;
   }
   if (endDate) {
      task.endDate = endDate;
   }

   return await fetch(`${baseURL}task/create/${category_type}`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         token: token,
      },
      body: JSON.stringify(task),
   });
}

async function loadTasks(token) {
   try {
      return await fetch(`${baseURL}task/allnotdeleted`, {
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      console.error("Erro na rede ao tentar carregar tarefas:", error);
   }
}

async function editTaskBE(token, id, title, description, priority, startDate, endDate, category_type) {
   let taskUpdates = {
      title: title,
      description: description,
      priority: priority,
      category_type: category_type,
   };

   // Inclui datas apenas se forem fornecidas e se não forem manda remover no back
   if (startDate && startDate !== "") taskUpdates.startDate = startDate;
   else taskUpdates.removeStartDate = true;
   if (endDate && endDate !== "") taskUpdates.endDate = endDate;
   else taskUpdates.removeEndDate = true;

   try {
      return await fetch(`${baseURL}task/edit/${id}`, {
         method: "PUT", // Usando PATCH para edição parcial
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
         body: JSON.stringify(taskUpdates),
      });
   } catch (error) {
      console.error("Error updating task:", error);
      alert("Network error or server is down. Please try again later.");
   }
}

async function deleteListener(token, taskId) {
   try {
      return await fetch(`${baseURL}task/deletetemp/${taskId}`, {
         method: "PATCH",
         headers: {
            // Assume que a autenticação é feita via cabeçalhos 'username' e 'password'
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      // Trata erros de rede ou de comunicação com o servidor
      console.error("Network error when trying to delete task:", error);
      alert("Network error. Please check your connection and try again.");
   }
}

async function updateTaskStatus(token, taskId, newStatus) {
   const taskUpdate = { status: newStatus };
   try {
      return await fetch(`${baseURL}task/status/${taskId}/${newStatus}`, {
         method: "PATCH",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status. Please try again.");
   }
}

async function createUsernameFilter(username, token) {
   try {
      return await fetch(`${baseURL}task/tasksnumber/${username}`, {
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      console.error("Erro na rede ao tentar carregar tarefas:", error);
   }
}

async function tasksByCategory(categoryType, token) {
   try {
      return await fetch(`${baseURL}category/tasksnumber/${categoryType}`, {
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      console.error("Erro na rede ao tentar carregar Categorias:", error);
   }
}

async function loadCategories(token) {
   try {
      return await fetch(`${baseURL}category/all`, {
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      console.error("Erro na rede ao tentar carregar Categorias:", error);
   }
}

async function loadUsers(token) {
   try {
      return await fetch(`${baseURL}user/all`, {
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      console.error("Erro na rede ao tentar carregar Utilizadores:", error);
   }
}

async function loadTasksByUser(token, filteredUsername) {
   try {
      return await fetch(`${baseURL}task/allbyuser?username=${filteredUsername}`, {
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      console.error("Erro na rede ao tentar carregar tarefas:", error);
   }
}
async function loadTasksByCategory(token, category_type) {
   try {
      return await fetch(`${baseURL}task/allbycategory?category=${category_type}`, {
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      console.error("Erro na rede ao tentar carregar tarefas:", error);
   }
}
async function loadTasksByUserAndCategory(token, filteredUsername, category_type) {
   try {
      return await fetch(`${baseURL}task/allbyuserandcategory?username=${filteredUsername}&category=${category_type}`, {
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      console.error("Erro na rede ao tentar carregar tarefas:", error);
   }
}

async function loadDeletedTasks(token) {
   try {
      return await fetch(`${baseURL}task/alldeleted`, {
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
         },
      });
   } catch (error) {
      console.error("Erro na rede ao tentar carregar Tarefas:", error);
   }
}

async function deleteTask(taskId, token) {
   return await fetch(`${baseURL}task/delete/${taskId}`, {
      method: "DELETE",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         token: token,
      },
   });
}

async function addCategory(type, token) {
   return await fetch(`${baseURL}category/add/${type}`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         token: token,
      },
   });
}

async function deleteCategory(categoryType, token) {
   return await fetch(`${baseURL}category/delete/${categoryType}`, {
      method: "DELETE",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         token: token,
      },
   });
}

async function editCategory(categoryType, newCategoryType, token) {
   return await fetch(`${baseURL}category/edit/${categoryType}/${newCategoryType}`, {
      method: "PATCH",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         token: token,
      },
   });
}

async function restaureTask(taskId, token) {
   return await fetch(`${baseURL}task/recycle/${taskId}`, {
      method: "PATCH",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         token: token,
      },
   });
}

function orderTasks(tasks) {
   tasks.sort((a, b) => {
      if (a.priority > b.priority) {
         return -1;
      } else if (a.priority < b.priority) {
         return 1;
      }

      // Handle initial dates
      if (a.startDate == undefined && b.startDate != undefined) {
         return 1;
      } else if (a.startDate != undefined && b.startDate === undefined) {
         return -1;
      } else if (a.startDate != undefined && b.startDate != undefined) {
         if (a.startDate < b.startDate) {
            return -1;
         } else if (a.startDate > b.startDate) {
            return 1;
         }
      }
      // Compare based on closest initial dates

      // Handle end dates
      if (a.endDate == undefined && b.endDate != undefined) {
         return 1;
      } else if (a.endDate != undefined && b.endDate == undefined) {
         return -1;
      } else if (a.endDate != undefined && b.endDate != undefined) {
         if (a.endDate < b.endDate) {
            return -1;
         } else if (a.endDate > b.endDate) {
            return 1;
         }
         // Compare based on closest end dates
      }

      return 0;
   });
   return tasks;
}

export {
   registerUser,
   loginAttempt,
   fetchPhotoNameAndRedirect,
   getAllCategories,
   addTaskBE,
   orderTasks,
   editTaskBE,
   deleteListener,
   updateTaskStatus,
   loadTasks,
   loadUsers,
   createUsernameFilter,
   tasksByCategory,
   loadCategories,
   loadTasksByUser,
   loadTasksByCategory,
   loadTasksByUserAndCategory,
   loadDeletedTasks,
   deleteTask,
   addCategory,
   deleteCategory,
   editCategory,
   restaureTask,
};

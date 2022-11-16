import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem('tasks')) || [],
  openTasks: false,
  openMenu : false,
  categories :JSON.parse(localStorage.getItem('categories')) || [
    {id : 1 , name : 'Personal' ,total : 0 , color :'orange-500'},
    {id : 2 , name : 'work' ,total : 0 , color : "lime-800"},
    {id : 3 , name : 'Busines' ,total : 0 , color : 'indigo-600'},
  ] 
};

function saveToStorageTasks (tasks) {
  localStorage.setItem('tasks' , JSON.stringify(tasks));
}
function saveToStorageCategories (categories) {
  localStorage.setItem('categories' , JSON.stringify(categories));
}
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskBtn: (state) => {
      state.openTasks = !state.openTasks
    },
    addTasks : (state ,{payload}) =>{
      state.todos.push(payload);
      const categorieTask = state.categories.find((c) => c.name === payload.categorie);
      categorieTask.total +=1;
      state.openTasks = false;
      saveToStorageTasks(state.todos);
      saveToStorageCategories(state.categories)
    },
    togglecompleteTasks : (state , action) => {
      const completeTodo = state.todos.find( t => t.id === action.payload.id);
      completeTodo.completed = !completeTodo.completed;
      saveToStorageTasks(state.todos);
    },
    deleteTasks : (state , action) =>{
      console.log(action);
      const deleteTasks = state.todos.filter((t) => t.id !== action.payload.id);
      const categorieTask = state.categories.find((c) => c.name === action.payload.categorie);
      categorieTask.total -=1;
      state.todos = deleteTasks;
      saveToStorageTasks(state.todos);
      saveToStorageCategories(state.categories);
    },
    toggleMenuTasks : (state) =>{
      state.openMenu = !state.openMenu
    },
    addCategories : (state ,{payload}) => {
      state.categories.push(payload)
      saveToStorageCategories(state.categories);
    }

  },
});

export const {toggleTaskBtn ,addTasks , togglecompleteTasks , deleteTasks , toggleMenuTasks , addCategories} = tasksSlice.actions;

export default tasksSlice.reducer
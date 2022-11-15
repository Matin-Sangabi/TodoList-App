import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem('tasks')) || [],
  openTasks: false,
};

function saveToStorage (tasks) {
  localStorage.setItem('tasks' , JSON.stringify(tasks));
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
      state.openTasks = false;
      saveToStorage(state.todos);
    },
    togglecompleteTasks : (state , action) => {
      const completeTodo = state.todos.find( t => t.id === action.payload.id);
      completeTodo.completed = !completeTodo.completed;
      saveToStorage(state.todos);
    },
    deleteTasks : (state , action) =>{
      const deleteTasks = state.todos.filter((t) => t.id !== action.payload.id);
      state.todos = deleteTasks;
      saveToStorage(state.todos);
    }

  },
});

export const {toggleTaskBtn ,addTasks , togglecompleteTasks , deleteTasks} = tasksSlice.actions;

export default tasksSlice.reducer
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
    }
  },
});

export const {toggleTaskBtn ,addTasks} = tasksSlice.actions;

export default tasksSlice.reducer
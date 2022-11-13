import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  openTasks: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskBtn: (state) => {
      state.openTasks = !state.openTasks
    },
  },
});

export const {toggleTaskBtn} = tasksSlice.actions;

export default tasksSlice.reducer
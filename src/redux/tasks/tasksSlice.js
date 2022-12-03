import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("tasks")) || [],
  openTasks: false,
  openMenu: false,
  editTask: { toggleOpenEdit: false, task: null },
  categories: JSON.parse(localStorage.getItem("categories")) || [
    { id: 1, name: "Personal", total: 0, color: "orange-500" },
    { id: 2, name: "work", total: 0, color: "lime-800" },
    { id: 3, name: "Busines", total: 0, color: "indigo-600" },
  ],
  theme: JSON.parse(localStorage.getItem("theme")) || "system",
};

function saveToStorageTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function saveToStorageCategories(categories) {
  localStorage.setItem("categories", JSON.stringify(categories));
}
function getOneCategorie(categorie, payload) {
  return categorie.find((c) => c.name.toLowerCase() === payload.toLowerCase());
}
function saveToStorageTheme(theme) {
  localStorage.setItem("theme", JSON.stringify(theme));
}
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskBtn: (state) => {
      state.openTasks = !state.openTasks;
    },
    addTasks: (state, { payload }) => {
      state.todos.push(payload);
      const categorieTask = state.categories.find(
        (c) => c.name === payload.categorie
      );
      categorieTask.total += 1;
      state.openTasks = false;
      saveToStorageTasks(state.todos);
      saveToStorageCategories(state.categories);
    },
    togglecompleteTasks: (state, action) => {
      const completeTodo = state.todos.find((t) => t.id === action.payload.id);
      completeTodo.completed = !completeTodo.completed;
      saveToStorageTasks(state.todos);
    },
    deleteTasks: (state, action) => {
      const deleteTasks = state.todos.filter(
        (t) => t.id !== Number(action.payload.id)
      );
      state.todos = deleteTasks;
      saveToStorageTasks(state.todos);
      const categorieTask = state.categories.find(
        (c) => c.name.toLowerCase() === action.payload.categorie.toLowerCase()
      );
      categorieTask.total -= 1;
      saveToStorageCategories(state.categories);
    },
    toggleMenuTasks: (state) => {
      state.openMenu = !state.openMenu;
    },
    addCategories: (state, { payload }) => {
      state.categories.push(payload);
      saveToStorageCategories(state.categories);
    },
    editTasksAdd: (state, action) => {
      const editTaskAdded = state.todos.findIndex(
        (t) => t.id === action.payload.task.id
      );
      if (action.payload.task.categorie !== action.payload.beforeCat) {
        const beforeCat = getOneCategorie(
          state.categories,
          action.payload.beforeCat
        );
        const afterCat = getOneCategorie(
          state.categories,
          action.payload.task.categorie
        );
        beforeCat.total -= 1;
        afterCat.total += 1;
        saveToStorageCategories(state.categories);
      }
      state.todos[editTaskAdded] = action.payload.task;
      state.editTask.toggleOpenEdit = false;
      saveToStorageTasks(state.todos);
    },
    deleteCategorie: (state, action) => {
      const deleteCat = state.categories.filter(
        (c) => c.id !== action.payload.id
      );
      state.categories = deleteCat;
      saveToStorageCategories(deleteCat);
    },
    editCategories: (state, action) => {
      if (state.todos.length) {
        const filterTasks = state.todos.filter(
          (t) =>
            t.categorie.toLowerCase() === action.payload.cat.name.toLowerCase()
        );
        filterTasks.map((item) => {
          return (item.categorie = action.payload.afterName);
        });
        saveToStorageTasks(state.todos);
      }
      const edit = state.categories.find((c) => c.id === action.payload.cat.id);
      edit.name = action.payload.afterName;
      edit.color = action.payload.color;
      saveToStorageCategories(state.categories);
    },
    editTaskToggler: (state, action) => {
      state.editTask.toggleOpenEdit = !state.editTask.toggleOpenEdit;
      if (action.payload) {
        state.editTask.task = action.payload.task;
      } else {
        state.editTask.task = null;
      }
    },
    toggleThemeTasks: (state, action) => {
      state.theme = action.payload.type;
      saveToStorageTheme(state.theme);
    },
  },
});
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
export function tasksThemes(userSelectTheme) {
  if (userSelectTheme === "dark" || (!userSelectTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
  } else if (userSelectTheme === "system") {
    localStorage.removeItem("theme");
    if (systemTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export const {
  toggleTaskBtn,
  addTasks,
  togglecompleteTasks,
  deleteTasks,
  toggleMenuTasks,
  addCategories,
  editTasksAdd,
  editTaskToggler,
  toggleThemeTasks,
  deleteCategorie,
  editCategories,
} = tasksSlice.actions;

export default tasksSlice.reducer;

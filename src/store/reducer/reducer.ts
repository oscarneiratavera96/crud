import { createSlice } from "@reduxjs/toolkit";
import { HomeState } from "./homeState.interface";

export const initialState: HomeState = {
  usuario: {
    user: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      verification: {
        email: false,
      },
    },
    token: "",
  },
  todo: {
    _id: "",
    title: "Diseñar interfaz",
    description: "",
    priority: 0,
    completed: false,
    hashtags: [],
  },
};

export const homeSlice = createSlice({
  name: "homeReducer",
  initialState,
  reducers: {
    actualizarUsuario: (state, action) => {
      state.usuario = action.payload;
    },
    actualizarTodoEditar: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export const { actualizarUsuario, actualizarTodoEditar } = homeSlice.actions;

export default homeSlice.reducer;

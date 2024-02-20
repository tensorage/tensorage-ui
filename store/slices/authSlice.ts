import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// declaring the types for our state
export type AuthState = {
  access_token: string;
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  isAdmin: boolean;
};

const initialState: AuthState = {
  access_token: "",
  id: "",
  email: "",
  firstname: "",
  lastname: "",
  image: "",
  isAdmin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.access_token = action.payload["access_token"];
      state.id = action.payload["id"];
      state.email = action.payload["email"];
      state.firstname = action.payload["firstname"];
      state.lastname = action.payload["lastname"];
      state.image = action.payload["image"];
      state.isAdmin = action.payload["isAdmin"];

      localStorage.setItem("access_token", state.access_token);
    },

    logout: (state) => {
      state.access_token = "";
      state.email = "";
      state.firstname = "";
      state.lastname = "";
      state.id = "";
      state.isAdmin = false
      localStorage.removeItem("access_token");
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { login, logout } = loginSlice.actions;

// exporting the reducer here, as we need to add this to the store
export default loginSlice.reducer;

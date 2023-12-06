import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const initialUsers = () => {
  // real case
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("users");
    return item ? JSON.parse(item) : {};
  }

  return {};
};
// save users in local storage

const initialIsAuth = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("isAuth");
    return item ? JSON.parse(item) : false;
  }
  return false;
};

const initialToken = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("token");
    return item ? JSON.parse(item) : null;
  }
  return null;
};

const initialTokenType = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("token_type");
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: initialUsers(),
    isAuth: initialIsAuth(),
    token: initialToken(),
    token_type: initialTokenType(),
  },
  reducers: {
    handleRegister: (state, action) => {
      const { isAuth, token, token_type, users } = action.payload;

      // Update state
      state.isAuth = isAuth;
      state.token = token;
      state.token_type = token_type;
      state.users = users;

      // Update local storage
      if (typeof window !== "undefined") {
        window?.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
        window?.localStorage.setItem("token", JSON.stringify(state.token));
        window?.localStorage.setItem(
          "token_type",
          JSON.stringify(state.token_type)
        );
        window?.localStorage.setItem("users", JSON.stringify(state.users));
      }
    },

    handleLogin: (state, action) => {
      const { isAuth, token, token_type, users } = action.payload;

      // Update state
      state.isAuth = isAuth;
      state.token = token;
      state.token_type = token_type;
      state.users = users;

      // Update local storage
      if (typeof window !== "undefined") {
        window?.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
        window?.localStorage.setItem("token", JSON.stringify(state.token));
        window?.localStorage.setItem(
          "token_type",
          JSON.stringify(state.token_type)
        );
        window?.localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      // remove isAuth from local storage
      if (typeof window !== "undefined") {
        window?.localStorage.removeItem("isAuth");
        window?.localStorage.removeItem("token");
        window?.localStorage.removeItem("token_type");
        window?.localStorage.removeItem("users");
      }
      toast.success("User logged out successfully", {
        position: "top-right",
      });
    },
  },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;

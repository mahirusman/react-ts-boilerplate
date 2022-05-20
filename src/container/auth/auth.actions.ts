import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "src/helper/ApiService";

// const services = Services(ApiService);

const Login_USER = "login user";

const AutEndPoints = {
  baseurl: "/auth",
  login: "/auth/login/",
};

console.log("Apiurls ", AutEndPoints);

export const userloginAction = createAsyncThunk(Login_USER, async (data, thunkApi) => {
  const response = await ApiService.clearAuthInfo(ApiService).post({
    url: AutEndPoints.login,
    payload: data,
  });
  if (response) return response;
  thunkApi.rejectWithValue("");
});

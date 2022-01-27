import { createAsyncThunk } from '@reduxjs/toolkit';
import { Iuser, logindataTypes } from '../../types/auth';
import httpClient from '../../utils/httpClient';

enum actiontype {
  Login_USER = 'login user action type',
}

export const userloginAction = createAsyncThunk(
  actiontype.Login_USER,
  async (payload: logindataTypes) => {
    const res = await httpClient.post<Iuser>('/user/sign-in', payload);
    return res;
  }
);

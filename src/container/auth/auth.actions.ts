import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/auth.service';
import { logindataTypes } from '../../types/auth';

enum actiontype {
  Login_USER = 'login user action type',
}

export const userloginAction = createAsyncThunk(
  actiontype.Login_USER,
  async (payload: logindataTypes) => {
    const res = await authService.login(payload);
    return res;
  }
);

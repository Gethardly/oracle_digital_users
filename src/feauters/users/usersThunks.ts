import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User.ts';
import axiosApi from '../axiosApi.ts';
import { addUserInState } from './usersSlice.ts';
import { store } from '../../app/store.ts';

export const getUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/getUsers',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get<User[]>('/');
      return response.data;
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : 'Unknown error');
    }
  }
);

export const addUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'users/addUser',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/', user);
      return response.data;
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : 'Unknown error');
    }
  }
)
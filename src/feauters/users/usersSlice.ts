import { User } from '../../types/User.ts';
import { addUser, changeUser, getUsers } from './usersThunks.ts';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface UsersState {
  users: User[],
  fetching: boolean,
  error: null | string,
}

const initialState: UsersState = {
  users: [],
  fetching: false,
  error: null,
}

const addUserToState = (state: UsersState, user: User) => {
  state.users.push(user);
};

const editUserToState = (state: UsersState, changedUser: User) => {
  state.users = state.users.map(user =>
    user.id === changedUser.id ? changedUser : user
  );
}

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    addUserInState: (state, {payload}) => {
      addUserToState(state, payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, {payload}) => {
        state.users = payload;
        state.fetching = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload || 'Failed to fetch users';
      });

    builder
      .addCase(addUser.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, {payload}) => {
        addUserToState(state, payload)
        state.fetching = false;
        state.error = null;
      })
      .addCase(addUser.rejected, (state, {payload}) => {
        state.fetching = false;
        state.error = payload;
      })

    builder
      .addCase(changeUser.pending, (state, {payload}) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(changeUser.fulfilled, (state, {payload}) => {
        editUserToState(state, payload);
        state.fetching = false;
        state.error = null;
      })
      .addCase(changeUser.rejected, (state, {payload}) => {
        state.fetching = false;
        state.error = payload;
      })
  },
});

export const {addUserInState} = usersSlice.actions;
export const usersReducer = usersSlice.reducer
export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersFetching = (state: RootState) => state.users.fetching;
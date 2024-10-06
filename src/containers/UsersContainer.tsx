import { Box, Button, Grid2, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { useEffect, useState } from 'react';
import { addUser, changeUser, getUsers } from '../feauters/users/usersThunks.ts';
import { selectUsers, selectUsersFetching } from '../feauters/users/usersSlice.ts';
import Loader from '../components/Loader/Loader.tsx';
import Users from '../components/Users.tsx';
import UserModal, { UserFormValues } from '../components/UserModal/UserModal.tsx';
import { SubmitHandler } from 'react-hook-form';
import { User } from '../types/User.ts';

const UsersContainer = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const fetching = useAppSelector(selectUsersFetching);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setModal] = useState(false);

  const handleModalClose = () => {
    setEditingUser(null);
    setModal(false);
  }

  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    dispatch(addUser(data));
    if (!fetching) {
      handleModalClose();
    }
  }

  const editingUserSet = (changingUser: User) => {
    setEditingUser(changingUser);
    setModal(true);
  }

  const editUserOnSubmit = (changedUser: User) => {
    dispatch(changeUser(changedUser));
    if (!fetching) {
      handleModalClose();
    }
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <Grid2>
      {fetching && <Loader/>}
      <Box component="div" sx={{mb: '20px', display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" onClick={() => setModal(true)}>Add user</Button>
      </Box>
      {users.length > 0 ?
        <Users users={users} setEditingUser={editingUserSet}/>
        : <Typography variant="h1" component="h1">Нет данных</Typography>}
      <UserModal open={isModalOpen}
                 handleClose={handleModalClose}
                 onSubmit={editingUser ? editUserOnSubmit : onSubmit}
                 editingUser={editingUser}/>
    </Grid2>
  );
};

export default UsersContainer;
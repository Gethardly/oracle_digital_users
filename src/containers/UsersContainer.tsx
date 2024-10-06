import { Box, Button, Grid2, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { useEffect } from 'react';
import { getUsers } from '../feauters/users/usersThunks.ts';
import { selectUsers, selectUsersFetching } from '../feauters/users/usersSlice.ts';
import Loader from '../components/Loader/Loader.tsx';
import Users from '../components/Users.tsx';

const UsersContainer = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const fetching = useAppSelector(selectUsersFetching);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <Grid2>
      {fetching && <Loader/>}
      <Box component='div' sx={{mb: '20px', display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant='contained'>Add user</Button>
      </Box>
      {users.length > 0 ? <Users users={users}/> : <Typography variant='h1' component='h1'>Нет данных</Typography>}
    </Grid2>
  );
};

export default UsersContainer;
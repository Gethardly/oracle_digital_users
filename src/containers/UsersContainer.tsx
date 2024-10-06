import { Box, Button, Grid2, TextField, Typography } from '@mui/material';
import Loader from '../components/Loader/Loader.tsx';
import Users from '../components/Users.tsx';
import UserModal from '../components/UserModal/UserModal.tsx';
import useUserManagement from '../hooks/useUserManagement.ts';
import { useState } from 'react';

const UsersContainer = () => {
  const {
    users,
    fetching,
    isModalOpen,
    editingUser,
    handleModalClose,
    onSubmit,
    editingUserSet,
    editUserOnSubmit,
    setModal,
    searchQuery,
    setSearchQuery,
    filteredUsers
  } = useUserManagement();

  return (
    <Grid2>
      {fetching && <Loader />}
      <Box component="div" sx={{ mb: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <TextField
            label="Search by name"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="contained" onClick={() => setModal(true)}>Add user</Button>
      </Box>
      {filteredUsers.length > 0 ? (
        <Users users={filteredUsers} setEditingUser={editingUserSet} />
      ) : (
        <Typography variant="h1" component="h1">Нет данных</Typography>
      )}
      <UserModal
        open={isModalOpen}
        handleClose={handleModalClose}
        onSubmit={editingUser ? editUserOnSubmit : onSubmit}
        editingUser={editingUser}
      />
    </Grid2>
  );
};

export default UsersContainer;
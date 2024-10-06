import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FC, useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { User, UserStatusesEnum } from '../../types/User.ts';
import { useForm, Controller } from 'react-hook-form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const textFieldStyle = {
  marginBottom: '10px',
};

interface Props {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: UserFormValues) => void;
  editingUser?: User | null;
}

interface UserFormValues {
  id?: number;
  name: string;
  email: string;
  status: string;
}

const UserModal: FC<Props> = ({ open, handleClose, onSubmit, editingUser }) => {
  const { control, handleSubmit, reset } = useForm<UserFormValues>();

  useEffect(() => {
    if (editingUser) {
      reset(editingUser);
    }
  }, [editingUser, reset]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-modal"
      aria-describedby="user-modal"
    >
      <Box component="form" sx={style} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h4">
          {editingUser ? 'Edit user' : 'Create user'}
        </Typography>
        <div style={textFieldStyle}>
          <Controller
            name="id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="ID"
                fullWidth
                type="number"
                disabled={!!editingUser}
              />
            )}
          />
        </div>
        <div style={textFieldStyle}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Name"
                fullWidth
              />
            )}
          />
        </div>
        <div style={textFieldStyle}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Email"
                fullWidth
              />
            )}
          />
        </div>
        <div style={textFieldStyle}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
              >
                {Object.values(UserStatusesEnum).map(status => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-evenly' }}>
          <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">{editingUser ? 'Edit' : 'Create'}</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default UserModal;

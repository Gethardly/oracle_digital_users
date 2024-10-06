import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { UserStatusesEnum } from '../../types/User.ts';

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
}

interface Props {
  id?: number;
  open: boolean;
  handleClose: () => void;
}

const UserModal: FC<Props> = ({open, handleClose, id}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-modal"
      aria-describedby="user-modal"
    >
      <Box component="form" sx={style}>
        <Typography variant="h4" component="h4">
          {id ? 'Edit user' : 'Create user'}
        </Typography>
        {!id && <div style={textFieldStyle}>
          <TextField
            label="ID"
            fullWidth
            type="number"
          />
        </div>}
        <div style={textFieldStyle}>
          <TextField
            //error
            label="Name"
            fullWidth
            //helperText="Incorrect entry."
          />
        </div>
        <div style={textFieldStyle}>
          <TextField
            label="Email"
            fullWidth
          />
        </div>
        <div>
          <TextField
            select
            label="Status"
            value="active"
            fullWidth
          >
            {
              Object.values(UserStatusesEnum).map(status =>
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              )
            }
          </TextField>
        </div>

        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-evenly'}}>
          <Button variant="contained" color="error">Cancel</Button>
          <Button variant="contained">{id ? 'Edit' : 'Create'}</Button>
        </div>
      </Box>
    </Modal>
  );
}

export default UserModal;
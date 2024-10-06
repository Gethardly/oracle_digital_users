import { User } from '../types/User.ts';
import { FC } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useSortedUsers from '../hooks/useSortedUsers';

const divSortStyle = {display: 'flex', alignItems: 'center'};

interface Props {
  users: User[];
  setEditingUser: (user: User) => void;
}

const Users: FC<Props> = ({users, setEditingUser}) => {
  const {sortedUsers, handleSort, sortField, sortOrder} = useSortedUsers(users);

  const renderSortIcon = (field: keyof User) => {
    if (field === sortField) {
      return sortOrder === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />;
    }
    return <KeyboardArrowDownIcon />;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{cursor: 'pointer'}}>ID</TableCell>
            <TableCell onClick={() => handleSort('name')} style={{cursor: 'pointer'}}>
              <div style={divSortStyle}>
                Name {renderSortIcon('name')}
              </div>
            </TableCell>
            <TableCell style={{cursor: 'pointer'}}>Email</TableCell>
            <TableCell onClick={() => handleSort('status')} style={{cursor: 'pointer'}}>
              <div style={divSortStyle}>
                Status {renderSortIcon('status')}
              </div>
            </TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button size="small" color="warning" onClick={() => setEditingUser(user)}>
                  <EditIcon/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { User } from '../types/User.ts';
import { SubmitHandler } from 'react-hook-form';
import { UserFormValues } from '../components/UserModal/UserModal.tsx';
import { selectUsers, selectUsersFetching } from '../feauters/users/usersSlice.ts';
import { addUser, changeUser, getUsers } from '../feauters/users/usersThunks.ts';

const useUserManagement = () => {
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

  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
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
  };
};

export default useUserManagement;

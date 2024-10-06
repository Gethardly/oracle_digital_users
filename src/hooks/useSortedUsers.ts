import { useState } from 'react';
import { User } from '../types/User.ts';

const useSortedUsers = (initialUsers: User[]) => {
  const [sortField, setSortField] = useState<keyof User>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedUsers = [...initialUsers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof User) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return { sortedUsers, handleSort, sortField, sortOrder };
};

export default useSortedUsers;
type UserStatus = 'active' | 'inactive' | 'banned' | 'guest';

export enum UserStatusesEnum {
  Active = 'active',
  Inactive = 'inactive',
  Banned = 'banned',
  Guest = 'guest'
}
export interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
}
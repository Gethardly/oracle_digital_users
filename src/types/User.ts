type UserStatus = 'active' | 'inactive' | 'banned' | 'guest';

export interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
}
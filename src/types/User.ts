type UserStatus = 'active' | 'inactive' | 'banned' | 'guest';

interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
}
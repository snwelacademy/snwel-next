import { DefaultSession } from 'next-auth';
import { UserRole } from '@/modules/user-management/types/permission.types';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      roles: UserRole[];
      jwt: string;
    } & DefaultSession['user']
  }

  interface JWT {
    id: string;
    roles: UserRole[];
    jwt: string;
  }
}
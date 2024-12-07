import { Permission, UserRole } from './permission.types';

export interface Location {
  _id: string;
  addr: string;
  state: string;
  city: string;
  country: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  profilePic: string;
  phone: string;
  location: Location;
  isActive: boolean;
  roles?: UserRole[];
  __v: number;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
  isSystem: boolean;
  status: 'active' | 'inactive';
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  phone: string;
  location: Omit<Location, '_id'>;
  isActive?: boolean;
  roles: string[];
}

export interface PaginatedResponse<T> {
  status: number;
  message: string;
  data: {
    docs: T[];
    total: number;
    page: number;
    limit: number;
  };
} 
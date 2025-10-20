import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PermissionCode } from '../modules/user-management/types/permission.types';

export async function checkPermission(
  request: NextRequest,
  requiredPermission: PermissionCode
) {
  try {
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userRoles = token.roles as Array<{
      permissions: Array<{
        code: PermissionCode
      }>
    }>;
    
    const hasPermission = userRoles?.some((role) => 
      role.permissions.some((permission) => permission.code === requiredPermission)
    );

    if (!hasPermission) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 
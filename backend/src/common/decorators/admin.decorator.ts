import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@/common/enums/role.enum';

export const ADMIN_KEY = 'role';
export const Admin = () => SetMetadata(ADMIN_KEY, UserRole.Admin);

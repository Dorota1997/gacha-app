import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@/common/enums/role.enum';

export const Admin = () => SetMetadata(UserRole.Admin, true);

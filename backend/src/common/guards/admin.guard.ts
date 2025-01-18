import { Reflector } from '@nestjs/core';
import { EntityManager } from '@mikro-orm/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Role } from '@/entities/role.entity';
import { User } from '@/entities/user.entity';
import { UserRole } from '@/common/enums/role.enum';
import { ADMIN_KEY } from '@/common/decorators/admin.decorator';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly entityManager: EntityManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const adminRole = this.reflector.getAllAndOverride<UserRole>(ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!adminRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const userRoleId = await (
      await this.entityManager.findOne(User, request.user.userId)
    ).role.uuid;

    const roleName = await (
      await this.entityManager.findOne(Role, userRoleId)
    ).name;

    return adminRole === roleName;
  }
}

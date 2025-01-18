import { Reflector } from '@nestjs/core';
import { EntityManager } from '@mikro-orm/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Role } from '@/entities/role.entity';
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

    const role = await this.entityManager.findOne(Role, {
      users: { uuid: request.user.userId },
    });

    return role.name === adminRole;
  }
}

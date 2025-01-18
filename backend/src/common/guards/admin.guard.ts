import { Reflector } from '@nestjs/core';
import { EntityManager } from '@mikro-orm/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Role } from '@/entities/role.entity';
import { UserRole } from '@/common/enums/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly entityManager: EntityManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAdminOnlyRequest = this.reflector.getAllAndOverride<boolean>(
      UserRole.Admin,
      [context.getHandler(), context.getClass()],
    );

    if (!isAdminOnlyRequest) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const role = await this.entityManager.findOne(Role, {
      users: { uuid: request.user.userId },
    });

    return role.name === UserRole.Admin;
  }
}

import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';
import { RoleGuard } from '../guards/role.guard';
import { ValidRoles } from '../types/valid-roles.type';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), RoleGuard)
  );
}
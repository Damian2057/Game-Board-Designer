import { SetMetadata } from '@nestjs/common';
import { ROLES } from "../const";

export const hasRoles = (...hasRoles: string[]) => SetMetadata(ROLES, hasRoles);

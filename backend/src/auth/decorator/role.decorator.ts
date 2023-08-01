import { SetMetadata } from '@nestjs/common';
import { ROLES } from "../util/const";

export const hasRoles = (...hasRoles: string[]) => SetMetadata(ROLES, hasRoles);

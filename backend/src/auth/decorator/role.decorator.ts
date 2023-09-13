import { SetMetadata } from '@nestjs/common';
import { ROLES } from "../util/const";

export const HasRoles = (...hasRoles: string[]) => SetMetadata(ROLES, hasRoles);

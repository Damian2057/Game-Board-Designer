import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { User } from "../model/domain/user.entity";
import { UserRoleEntity } from "../model/domain/user.role.entity";

@Injectable()
export class HierarchyGuard implements CanActivate {

  constructor(private readonly userService: UserService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const owner: User = await this.userService.findOne(request.user.id);
    const affectedUser = await this.userService.findOne(params.id);
    if (owner.role === UserRoleEntity.USER) {
      return false;
    }
    if (owner.role === UserRoleEntity.ADMIN) {
      return true;
    }
    if (owner.role === UserRoleEntity.EMPLOYEE) {
      if (affectedUser.role === UserRoleEntity.ADMIN || affectedUser.role === UserRoleEntity.EMPLOYEE || params.role !== null) {
        return false;
      }
    }

    return true;
  }
}
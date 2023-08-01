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
    const owner: User = request.user;
    const affectedUser = await this.userService.findOne(params.id)
    return !(owner.role == UserRoleEntity.EMPLOYEE && affectedUser.role == UserRoleEntity.EMPLOYEE);
  }
}
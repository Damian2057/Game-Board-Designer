import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { User } from "../model/domain/user.entity";
import { UserRole } from "../model/domain/user.role.enum";

@Injectable()
export class HierarchyGuard implements CanActivate {

  constructor(private readonly userService: UserService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const owner: User = await this.userService.findOne(request.user.id);
    const affectedUser = await this.userService.findOne(params.id);
    if (owner.role === UserRole.USER) {
      return false;
    }
    if (owner.role === UserRole.ADMIN) {
      return true;
    }
    if (owner.role === UserRole.EMPLOYEE) {
      if (affectedUser.role === UserRole.ADMIN || affectedUser.role === UserRole.EMPLOYEE || params.role !== null) {
        return false;
      }
    }

    return true;
  }
}
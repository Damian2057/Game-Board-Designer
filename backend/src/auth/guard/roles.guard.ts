import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserService } from "../../users/service/user.service";
import { User } from "../../users/model/domain/user.entity";
import { ROLES } from "../const";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,

    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLES, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) {
      return false;
    }

    return this.userService.findOne(user.id).then((user: User) => {
      const hasRole = () => roles.indexOf(user.role) > -1;
      let hasPermission: boolean = false;

      if (hasRole()) {
        hasPermission = true;
      }

      return user && hasPermission;
    });
  }
}
import { CanActivate, Injectable } from "@nestjs/common";
import { User } from "../../users/model/domain/user.entity";
import { UserService } from "../../users/service/user.service";
import { ProjectService } from "../service/project.service";

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
      private readonly userService: UserService,
      private readonly projectService: ProjectService,
    ) {}

    async canActivate(context): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const params = request.params;

      const sender: User = await this.userService.findOne(request.user.id);
      const project = await this.projectService.findOne(params.id);
      project

      return true;
    }
}
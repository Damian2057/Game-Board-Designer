import { CanActivate, Injectable } from "@nestjs/common";
import { User } from "../../users/model/domain/user.entity";
import { UserService } from "../../users/service/user.service";
import { ProjectCreatorService } from "../service/project.creator.service";
import { UserRole } from "../../users/model/domain/user.role.enum";

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
      private readonly userService: UserService,
      private readonly projectService: ProjectCreatorService,
    ) {}

    async canActivate(context): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const params = request.params;

      const sender: User = await this.userService.findOne(request.user.id);
      const project = await this.projectService.getProjectDtoById(params.id);
      return !(project.isCompleted || (sender.role !== UserRole.ADMIN && sender.id !== project.user.id));
    }
}
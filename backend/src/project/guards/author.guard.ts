import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { User } from "../../users/model/domain/user.entity";
import { UserService } from "../../users/service/user.service";
import { ProjectCreatorService } from "../service/project.creator.service";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { ProjectDto } from "../model/dto/project.dto";

@Injectable()
export class AuthorGuard implements CanActivate {

    constructor(
      private readonly userService: UserService,
      private readonly projectService: ProjectCreatorService,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;

    const sender: User = await this.userService.findOne(request.user.id);
    const project = await this.projectService.getProjectDtoById(params.id);

    if (this.canAccessTemplate(project)) {
      return true;
    }

    if (this.isProjectCompleted(project)) {
      return false;
    }

    return this.isAdminOrOwner(sender, project);
  }

  private canAccessTemplate(project: ProjectDto): boolean {
    return project.isTemplate;
  }

  private isProjectCompleted(project: ProjectDto): boolean {
    return project.isCompleted;
  }

  private isAdminOrOwner(sender: User, project: ProjectDto): boolean {
    return sender.role === UserRole.ADMIN || sender.id === project.user.id;
  }
}
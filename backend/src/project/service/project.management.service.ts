import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectManagementService {

  createNewProjectBasedOnExistingProject(user, projectId: number) {
    return undefined;
  }

  getMyProjects(user) {
    return [];
  }

  getMyCompletedProjects(user) {
    return [];
  }

  getMyOngoingProjects(user) {
    return [];
  }

  getAllProjectsForUser(userId: number) {
    return [];
  }

  getAllCompletedProjects(userId: number) {
    return [];
  }

  getAllOngoingProjects(userId: number) {
    return [];
  }

  assignProjectToUser(user, projectId: number) {
    return undefined;
  }
}

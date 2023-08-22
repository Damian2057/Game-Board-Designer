import { Injectable } from '@nestjs/common';
import { UpdateElementCommand } from "../model/command/element/update.element.command";
import { CreateElementCommand } from "../model/command/element/create.element.command";

@Injectable()
export class ElementService {
  
  updateElement(command: UpdateElementCommand, elementId: number) {
    return undefined;
  }


  addContainerElement(command: CreateElementCommand, containerId: number) {
    return undefined;
  }

  addProjectElement(command: CreateElementCommand, projectId: number) {
    return undefined;
  }

  getElementById(elementId: number) {
    return undefined;
  }

  getAllContainerElementsByContainerId(containerId: number) {
    return [];
  }

  getAllProjectElementsByProjectId(projectId: number) {
    return [];
  }

  deleteElementById(elementId: number) {
    
  }
}

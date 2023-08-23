import { Box } from "../model/domain/box.entity";
import { BoxDto } from "../model/dto/box.dto";
import { Property } from "../model/domain/property.entity";
import { Element } from "../model/domain/element.entity";
import { ElementDto } from "../model/dto/element.dto";
import { Container } from "../model/domain/container.entity";
import { ContainerDto } from "../model/dto/container.dto";
import { Project } from "../model/domain/project.entity";
import { ProjectDto } from "../model/dto/project.dto";
import { PropertyDto } from "../model/dto/property.dto";
import { mapGameToGameDto } from "../../game/util/util.functions";

export function mapPropertyToPropertyDto(property: Property): PropertyDto {
  const propertyDto = new PropertyDto();
  propertyDto.id = property.id;
  propertyDto.name = property.name;
  propertyDto.value = property.value;

  return propertyDto;
}

export function mapBoxToBoxDto(box: Box): BoxDto {
  const boxDto = new BoxDto();
  boxDto.id = box.id;
  boxDto.name = box.name;
  boxDto.description = box.description;
  boxDto.notes = box.notes;
  boxDto.properties = box.properties.map((property: Property) => mapPropertyToPropertyDto(property));
  boxDto.imageIds = box.imageIds;
  boxDto.type = box.type;
  boxDto.status = box.status;
  boxDto.priority = box.priority;

  return boxDto;
}
export function mapElementToElementDto(element: Element): ElementDto {
  const elementDto = new ElementDto();
  elementDto.id = element.id;
  elementDto.name = element.name;
  elementDto.description = element.description;
  elementDto.notes = element.notes;
  elementDto.quantity = element.quantity;
  elementDto.properties = element.properties.map((property: Property) => mapPropertyToPropertyDto(property));
  elementDto.imageIds = element.imageIds;
  elementDto.type = element.type;
  elementDto.status = element.status;
  elementDto.priority = element.priority;

  return elementDto;
}

export function mapContainerToContainerDto(container: Container): ContainerDto {
  const containerDto = new ContainerDto();
  containerDto.id = container.id;
  containerDto.name = container.name;
  containerDto.description = container.description;
  containerDto.quantity = container.quantity;
  containerDto.notes = container.notes;
  containerDto.elements = container.elements.map((element: Element) => mapElementToElementDto(element));
  containerDto.properties = container.properties.map((property: Property) => mapPropertyToPropertyDto(property));
  containerDto.imageIds = container.imageIds;
  containerDto.type = container.type;
  containerDto.status = container.status;
  containerDto.priority = container.priority;

  return containerDto;
}

export function mapProjectToProjectDto(project: Project): ProjectDto {
const projectDto = new ProjectDto();
  projectDto.id = project.id;
  projectDto.name = project.name;
  projectDto.description = project.description;
  projectDto.notes = project.notes;
  projectDto.box = mapBoxToBoxDto(project.box);
  projectDto.containers = project.containers.map((container: Container) => mapContainerToContainerDto(container));
  projectDto.elements = project.elements.map((element: Element) => mapElementToElementDto(element));
  projectDto.imageIds = project.imageIds;
  projectDto.isTemplate = project.isTemplate;
  projectDto.isCompleted = project.isCompleted;
  projectDto.games = mapGameToGameDto(project.games);

  return projectDto;
}
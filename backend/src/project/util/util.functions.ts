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
import { mapUserToUserDto } from "../../users/util/util.functions";
import { CreateElementCommand } from "../model/command/element/create.element.command";
import { CreateContainerCommand } from "../model/command/container/create.container.command";
import { CreateProjectCommand } from "../model/command/project-creator/create.project.command";

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
  if (project.games) {
    projectDto.games = project.games.map((game) => mapGameToGameDto(game));
  }
  if (project.currentGame) {
    projectDto.currentGame = mapGameToGameDto(project.currentGame);
  }
  if (project.user) {
    projectDto.user = mapUserToUserDto(project.user)
  }

  return projectDto;
}

export function mapElementCommandToElement(command: CreateElementCommand): Element {
  const element: Element = new Element();
  element.name = command.name;
  element.description = command.description;
  element.notes = command.notes;
  element.quantity = command.quantity;
  element.imageIds = command.imageIds;
  element.properties = command.properties.map((propertyDto: PropertyDto) => mapPropertyDtoToProperty(propertyDto));
  if (command.status) {
    element.status = command.status;
  }
  if (command.priority) {
    element.priority = command.priority;
  }

  return element;
}

export function mapContainerCommandToContainer(command: CreateContainerCommand): Container {
  const container: Container = new Container();
  container.name = command.name;
  container.description = command.description;
  container.notes = command.notes;
  container.quantity = command.quantity;
  container.imageIds = command.imageIds;
  container.elements = command.elements.map((elementDto: ElementDto) => mapElementDtoToElement(elementDto));
  container.properties = command.properties.map((propertyDto: PropertyDto) => mapPropertyDtoToProperty(propertyDto));
  if (command.status) {
    container.status = command.status;
  }
  if (command.priority) {
    container.priority = command.priority;
  }
  return container;
}

export function mapPropertyDtoToProperty(propertyDto: PropertyDto): Property {
  const property: Property = new Property();
  if (propertyDto.id) {
    property.id = propertyDto.id;
  }
  property.name = propertyDto.name;
  property.value = propertyDto.value;

  return property;
}

export function mapElementDtoToElement(elementDto: ElementDto): Element {
  const element: Element = new Element();
  if (elementDto.id) {
    element.id = elementDto.id;
  }
  element.name = elementDto.name;
  element.description = elementDto.description;
  element.notes = elementDto.notes;
  element.quantity = elementDto.quantity;
  element.imageIds = elementDto.imageIds;
  element.properties = elementDto.properties.map((propertyDto: PropertyDto) => mapPropertyDtoToProperty(propertyDto));
  element.type = elementDto.type;
  if (elementDto.status) {
    element.status = elementDto.status;
  }
  if (elementDto.priority) {
    element.priority = elementDto.priority;
  }
  return element;
}

function mapBoxDtoToBox(boxDto: BoxDto): Box {
  const box: Box = new Box();
  if (boxDto.id) {
    box.id = boxDto.id;
  }
  box.name = boxDto.name;
  box.description = boxDto.description;
  box.notes = boxDto.notes;
  box.properties = boxDto.properties.map((propertyDto: PropertyDto) => mapPropertyDtoToProperty(propertyDto));
  box.imageIds = boxDto.imageIds;
  if (boxDto.status) {
    box.status = boxDto.status;
  }
  if (boxDto.priority) {
    box.priority = boxDto.priority;
  }
  return box;
}

function mapContainerDtoToContainer(containerDto: ContainerDto): Container {
  const container: Container = new Container();
  if (containerDto.id) {
    container.id = containerDto.id;
  }
  container.name = containerDto.name;
  container.description = containerDto.description;
  container.notes = containerDto.notes;
  container.quantity = containerDto.quantity;
  container.imageIds = containerDto.imageIds;
  container.elements = containerDto.elements.map((elementDto: ElementDto) => mapElementDtoToElement(elementDto));
  container.properties = containerDto.properties.map((propertyDto: PropertyDto) => mapPropertyDtoToProperty(propertyDto));
  if (containerDto.status) {
    container.status = containerDto.status;
  }
  if (containerDto.priority) {
    container.priority = containerDto.priority;
  }
  return container;
}

export function mapProjectCreateCommandToProject(command: CreateProjectCommand): Project {
  const project: Project = new Project();
  project.name = command.name;
  project.description = command.description;
  project.notes = command.notes;
  project.imageIds = command.imageIds;
  project.isTemplate = true;
  project.isCompleted = false;
  project.box = mapBoxDtoToBox(command.box);
  project.containers = command.containers.map((containerDto: ContainerDto) => mapContainerDtoToContainer(containerDto));
  project.elements = command.elements.map((elementDto: ElementDto) => mapElementDtoToElement(elementDto));

  return project;
}
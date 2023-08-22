import { Injectable } from '@nestjs/common';
import { Project } from "../model/domain/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Element } from "../model/domain/element.entity";
import { Property } from "../model/domain/property.entity";
import { Repository } from "typeorm";
import { Game } from "../../game/model/domain/game.entity";
import { Box } from "../model/domain/box.entity";
import { CreateProjectCommand } from "../model/command/create.project.command";
import { User } from "../../users/model/domain/user.entity";
import { ProjectDto } from "../model/dto/project.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>,
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async test(user: User) {
    console.log(user);
    const game = await this.gameRepository.find();
    const game2 = game[0];
    const project = new Project();
    project.elements = [];
    const elem = new Element();
    elem.properties = [];
    const prop = new Property();
    prop.name = 'test';
    prop.value = 'test';

    elem.properties.push(prop);
    elem.name = 'test';
    elem.description = 'test';
    elem.notes = ['test'];
    elem.quantity = 1;

    project.name = 'test';
    project.description = 'test';
    project.notes = ['test'];
    project.elements.push(elem);
    const box = new Box();
    box.name = 'test';
    box.description = 'test';
    box.notes = ['test'];
    box.properties = [];
    const prop2 = new Property();
    prop2.name = 'test';
    prop2.value = 'test';
    box.properties.push(prop2);
    await this.boxRepository.save(box);
    project.box = box;
    project.games = [game2];
    project.currentGame = game2;
    project.user = user;
    await this.projectRepository.save(project);
    return await this.projectRepository.find({
      relations: {
        games: true,
        currentGame: true,
        box: {
          properties: true
        },
        user: true,
        containers: {
          properties: true,
          elements: {
            properties: true
          }
        },
        elements: {
          properties: true
        }
      }
    });
  }

  createNewProjectTemplate(command: CreateProjectCommand) {
    return undefined;
  }

  async findOne(id): Promise<ProjectDto> {
    return null;
  }
}

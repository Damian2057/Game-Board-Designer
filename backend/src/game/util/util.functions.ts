import { Tag } from "../model/domain/tag.entity";
import { TagDto } from "../model/dto/tag.dto";
import { CreateTagCommand } from "../model/command/create.tag.command";
import { Game } from "../model/domain/game.entity";
import { GameDto } from "../model/dto/game.dto";
import { ComponentDto } from "../model/dto/component.dto";
import { Component } from "../model/domain/component";
import { CreateComponentCommand } from "../model/command/create.component.command";
import { CreateGameCommand } from "../model/command/create.game.command";

export function mapTagToTagDto(tag: Tag): TagDto {
  const tagDto = new TagDto();
  tagDto.id = tag.id;
  tagDto.name = tag.name;
  return tagDto;
}

export function mapComponentToComponentDto(component: Component): ComponentDto {
  const componentDto = new ComponentDto();
  componentDto.id = component.id;
  componentDto.name = component.name;
  componentDto.quantity = component.quantity;
  return componentDto;
}

export function mapGameToGameDto(game: Game) {
  const gameDto = new GameDto();
  gameDto.id = game.id;
  gameDto.title = game.title;
  gameDto.description = game.description;
  gameDto.publicationDate = game.publicationDate;
  gameDto.price = game.price;
  gameDto.tags = game.tags.map(tag => mapTagToTagDto(tag));
  gameDto.components = game.components.map(component => mapComponentToComponentDto(component));
  gameDto.imageIds = game.imageIds;
  if (game.currency) {
    gameDto.currency = game.currency;
  }
  return gameDto;
}

export function mapTagCommandToTag(command: CreateTagCommand): Tag {
  const tag = new Tag();
  tag.name = command.name;
  return tag;
}

export function mapComponentCommandToComponent(command: CreateComponentCommand, game: Game): Component {
  const component = new Component();
  component.name = command.name;
  component.quantity = command.quantity;
  component.game = game;
  return component;
}

export function mapGameCommandToGame(command: CreateGameCommand): Game {
  const game = new Game();
  game.title = command.title;
  game.description = command.description;
  game.publicationDate = command.publicationDate;
  game.price = command.price;
  game.components = command.components.map(component => mapComponentCommandToComponent(component, game));
  return game;
}

export function mapComponentDtoToComponent(command: ComponentDto): Component {
  const component = new Component();
  if (command.id) {
    component.id = command.id;
  }
  component.name = command.name;
  component.quantity = command.quantity;
  return component;
}
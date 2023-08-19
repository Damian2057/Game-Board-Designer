import { Tag } from "../model/domain/tag.entity";
import { TagDto } from "../model/dto/tag.dto";
import { CreateTagCommand } from "../model/command/create.tag.command";
import { Game } from "../model/domain/game.entity";
import { GameDto } from "../model/dto/game.dto";
import { ComponentDto } from "../model/dto/component.dto";
import { Component } from "../model/domain/component";
import { CreateComponentCommand } from "../model/command/create.component.command";

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
  return gameDto;
}

export function mapTagCommandToTag(command: CreateTagCommand): Tag {
  const tag = new Tag();
  tag.name = command.name;
  return tag;
}
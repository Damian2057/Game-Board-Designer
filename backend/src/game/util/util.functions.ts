import { Tag } from "../model/domain/tag.entity";
import { TagDto } from "../model/dto/tag.dto";
import { CreateTagCommand } from "../model/command/create.tag.command";
import { GameEntity } from "../model/domain/game.entity";
import { GameDto } from "../model/dto/game.dto";
import { ElementDto } from "../model/dto/element.dto";
import { ElementEntity } from "../model/domain/element.entity";
import { CreateBoardGameElementCommand } from "../model/command/create.board-game.element.command";

export function mapTagToTagDto(tag: Tag): TagDto {
  const tagDto = new TagDto();
  tagDto.id = tag.id;
  tagDto.name = tag.name;
  return tagDto;
}

export function mapElementToElementDto(element: ElementEntity): ElementDto {
  const elementDto = new ElementDto();
  elementDto.id = element.id;
  elementDto.name = element.name;
  elementDto.quantity = element.quantity;
  return elementDto;
}

export function mapGameToGameDto(game: GameEntity) {
  const gameDto = new GameDto();
  gameDto.id = game.id;
  gameDto.title = game.title;
  gameDto.description = game.description;
  gameDto.publicationDate = game.publicationDate;
  gameDto.price = game.price;
  gameDto.tags = game.tags.map(tag => mapTagToTagDto(tag));
  gameDto.gameElements = game.gameElements.map(gameElement => mapElementToElementDto(gameElement));
  gameDto.imageIds = game.imageIds;
  return gameDto;
}

export function mapTagCommandToTag(command: CreateTagCommand): Tag {
  const tag = new Tag();
  tag.name = command.name;
  return tag;
}

export function mapElementCommandToElement(command: CreateBoardGameElementCommand): ElementEntity {
  const element = new ElementEntity();
  element.name = command.name;
  element.quantity = command.quantity;
  return element;
}
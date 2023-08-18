import { Tag } from "../model/domain/tag.entity";
import { TagDto } from "../model/dto/tag.dto";
import { CreateTagCommand } from "../model/command/create.tag.command";
import { Game } from "../model/domain/game";
import { GameDto } from "../model/dto/game.dto";
import { ElementDto } from "../model/dto/element.dto";
import { Element } from "../model/domain/element";
import { CreateBoardGameElementCommand } from "../model/command/create.board-game.element.command";

export function mapTagToTagDto(tag: Tag): TagDto {
  const tagDto = new TagDto();
  tagDto.id = tag.id;
  tagDto.name = tag.name;
  return tagDto;
}

export function mapElementToElementDto(element: Element): ElementDto {
  const elementDto = new ElementDto();
  elementDto.id = element.id;
  elementDto.name = element.name;
  elementDto.quantity = element.quantity;
  return elementDto;
}

export function mapGameToGameDto(game: Game) {
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

export function mapElementCommandToElement(command: CreateBoardGameElementCommand): Element {
  const element = new Element();
  element.name = command.name;
  element.quantity = command.quantity;
  return element;
}
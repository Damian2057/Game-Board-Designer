import { Tag } from "../model/domain/tag.entity";
import { TagDto } from "../model/dto/tag.dto";
import { CreateTagCommand } from "../model/command/create.tag.command";
import { BoardGame } from "../model/domain/board-game.entity";
import { BoardGameDto } from "../model/dto/board-game.dto";
import { GameElementDto } from "../model/dto/game-element.dto";
import { GameElement } from "../model/domain/game.element.entity";
import { CreateBoardGameElementCommand } from "../model/command/create.board-game.element.command";

export function mapTagToTagDto(tag: Tag): TagDto {
  const tagDto = new TagDto();
  tagDto.id = tag.id;
  tagDto.name = tag.name;
  return tagDto;
}

export function mapGameElementToGameElementDto(gameElement: GameElement): GameElementDto {
  const gameElementDto = new GameElementDto();
  gameElementDto.id = gameElement.id;
  gameElementDto.name = gameElement.name;
  gameElementDto.quantity = gameElement.quantity;
  return gameElementDto;
}

export function mapBoardGameToBoardGameDto(boardGame: BoardGame) {
  const boardGameDto = new BoardGameDto();
  boardGameDto.id = boardGame.id;
  boardGameDto.title = boardGame.title;
  boardGameDto.description = boardGame.description;
  boardGameDto.publicationDate = boardGame.publicationDate;
  boardGameDto.price = boardGame.price;
  boardGameDto.tags = boardGame.tags.map(tag => mapTagToTagDto(tag));
  boardGameDto.gameElements = boardGame.gameElements.map(gameElement => mapGameElementToGameElementDto(gameElement));
  return boardGameDto;
}

export function mapTagCommandToTag(command: CreateTagCommand): Tag {
  const tag = new Tag();
  tag.name = command.name;
  return tag;
}

export function mapBoardElementCommandToGameElement(command: CreateBoardGameElementCommand): GameElement {
  const gameElement = new GameElement();
  gameElement.name = command.name;
  gameElement.quantity = command.quantity;
  return gameElement;
}
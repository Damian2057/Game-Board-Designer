import { Game } from "../../src/game/model/domain/game.entity";

export function createGame(title, description, publicationDate, price, currency, tags, components, imageIds): Game {
  const game = new Game();
  game.title = title;
  game.description = description;
  game.publicationDate = publicationDate;
  game.price = price;
  game.currency = currency;
  game.tags = tags;
  game.components = components;
  game.imageIds = imageIds;

  return game;
}
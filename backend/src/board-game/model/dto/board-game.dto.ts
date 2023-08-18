import { GameElementDto } from "./game-element.dto";
import { TagDto } from "./tag.dto";

export class BoardGameDto {
  id: number;
  title: string;
  description: string;
  publicationDate: string;
  price: number;
  tags: TagDto[];
  gameElements: GameElementDto[];
  imageIds: number[];
}
import { ElementDto } from "./element.dto";
import { TagDto } from "./tag.dto";

export class GameDto {
  id: number;
  title: string;
  description: string;
  publicationDate: string;
  price: number;
  tags: TagDto[];
  gameElements: ElementDto[];
  imageIds: number[];
}
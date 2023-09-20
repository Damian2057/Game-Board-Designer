import { ComponentDto } from "./component.dto";
import { TagDto } from "./tag.dto";

export class GameDto {
  id: number;
  title: string;
  description: string;
  publicationDate: string;
  price: number;
  currency: string;
  tags: TagDto[];
  components: ComponentDto[];
  imageIds: number[];
}
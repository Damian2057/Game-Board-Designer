import { Tag } from "../model/domain/tag.entity";
import { TagDto } from "../model/dto/tag.dto";

export function mapTagToTagDto(tag: Tag): TagDto {
  const tagDto = new TagDto();
  return tagDto;
}
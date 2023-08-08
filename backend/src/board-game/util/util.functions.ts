import { Tag } from "../model/domain/tag.entity";
import { TagDto } from "../model/dto/tag.dto";
import { CreateTagCommand } from "../model/command/create.tag.command";

export function mapTagToTagDto(tag: Tag): TagDto {
  const tagDto = new TagDto();
  tagDto.id = tag.id;
  tagDto.name = tag.name;
  return tagDto;
}

export function mapTagCommandToTag(command: CreateTagCommand): Tag {
  const tag = new Tag();
  tag.name = command.name;
  return tag;
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "../model/domain/tag.entity";
import { Repository } from "typeorm";
import { CreateTagCommand } from "../model/command/create.tag.command";
import { UpdateTagCommand } from "../model/command/update.tag.command";
import { DuplicateKeyParameterException } from "../../exceptions/type/duplicate.key.parameter.exception";
import { mapTagCommandToTag, mapTagToTagDto } from "../util/util.functions";
import { TagDto } from "../model/dto/tag.dto";
import { SetFilter } from "../../util/SetFilter";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { Result } from "../../util/pojo/Result";

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {
  }

  async findAll(): Promise<TagDto[]> {
    const tags: Tag[] = await this.tagRepository.find();
    return tags.map(tag => mapTagToTagDto(tag));
  }

  async find(id: number, name: string): Promise<TagDto[]> {
    const tags = new SetFilter();
    if (name) {
      const result: Tag = await this.tagRepository.findOneBy({name: name});
      if (result) {
        tags.add(result);
      }
    }
    if (id) {
      const result: Tag = await this.tagRepository.findOneBy({id: id});
      if (result) {
        tags.add(result);
      }
    }
    return Array.from(tags.get()).map(tag => mapTagToTagDto(tag));
  }

  async create(command: CreateTagCommand): Promise<TagDto> {
    if (await this.tagRepository.findOneBy({name: command.name}) == null) {
      const tag = await this.tagRepository.save(mapTagCommandToTag(command));
      return mapTagToTagDto(tag);
    }
    throw new DuplicateKeyParameterException(`Tag with name: ${command.name} already exists!`);
  }

  async updateById(id: number, command: UpdateTagCommand): Promise<TagDto> {
    let tag: Tag = await this.tagRepository.findOneBy({id: id});
    if (tag == null) {
      throw new IllegalArgumentException(`Tag with id: ${id} does not exist!`)
    }
    tag = this.updateNotNullFields(tag, command);
    const updated: Tag = await this.tagRepository.save(tag);
    return mapTagToTagDto(updated);
  }

  async deleteById(id: number): Promise<Result> {
    const result = await this.tagRepository.delete({ id: id })
    if (result.affected > 0) {
      return new Result(result);
    }
    throw new IllegalArgumentException(`Tag with id: ${id} does not exist!`)
  }

  private updateNotNullFields(tag: Tag, command: UpdateTagCommand): Tag {
    if (command.name != null) {
      tag.name = command.name;
    }
    return tag;
  }
}

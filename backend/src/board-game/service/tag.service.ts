import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "../model/domain/tag.entity";
import { Repository } from "typeorm";
import { CreateTagCommand } from "../model/command/create.tag.command";
import { UpdateTagCommand } from "../model/command/update.tag.command";
import { DuplicateKeyParameterException } from "../../exceptions/type/duplicate.key.parameter.exception";
import { mapTagCommandToTag } from "../util/util.functions";

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {
  }

  findAll() {
    return this.tagRepository.find();
  }

  async findByFilter(id: number, name: string): Promise<Tag[]> {
    const tags = new Set<Tag>();
    if (name != null) {
      const result = await this.tagRepository.findOneBy({name: name});
      if (result != null) {
        tags.add(result);
      }
    }
    if (id != null) {
      const result = await this.tagRepository.findOneBy({id: id});
      if (result != null) {
        tags.add(result);
      }
    }
    return Array.from(tags);
  }

  async create(command: CreateTagCommand): Promise<boolean> {
    if (await this.tagRepository.findOneBy({name: command.name}) == null) {
      await this.tagRepository.save(mapTagCommandToTag(command));
      return true;
    }
    throw new DuplicateKeyParameterException('Tag with name: ' + command.name + ' already exists!');
  }

  updateById(id: number, command: UpdateTagCommand) {
    return undefined;
  }

  deleteById(id: number) {
    return false;
  }
}

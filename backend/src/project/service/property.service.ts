import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Property } from "../model/domain/property.entity";
import { UpdatePropertyCommand } from "../model/command/property/update.property.command";
import { mapPropertyDtoToProperty } from "../util/util.functions";
import { Result } from "../../util/pojo/Result";

@Injectable()
export class PropertyService {

  constructor(
    @InjectRepository(Property)
    private readonly elementRepository: Repository<Property>,
  ) {}

  async updateProperty(command: UpdatePropertyCommand, propertyId: number): Promise<any> {
    const result = await this.elementRepository.update(propertyId, { value: command.value, name: command.name });
    return new Result(result);
  }

  async getProperty(id: number) {
    const property: Property = await this.elementRepository.findOneBy({id: id});
    return mapPropertyDtoToProperty(property);
  }

  async deleteProperty(id: number) {
    const result = await this.elementRepository.delete(id);
    return new Result(result);
  }
}

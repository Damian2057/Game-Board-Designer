import { Injectable } from '@nestjs/common';
import { Information } from "../model/domain/information.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { InformationDto } from "../model/dto/information.dto";
import { mapInformationToUpdatedInformation } from "../util/util.functions";

@Injectable()
export class InformationService {

  constructor(
    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>
  ) {}

  async updateAbout(address: string, phoneNumber: string, email: string): Promise<InformationDto> {
    this.checkNulls(address, phoneNumber, email);
    let information = await this.getInformation();
    if (!information) {
      information = new Information(address, phoneNumber, email);
      return this.informationRepository.save(information);
    }
    await this.informationRepository.update(information.id, { address, phoneNumber, email });
    return mapInformationToUpdatedInformation(await this.getInformation());
  }

  async getAbout() {
    return mapInformationToUpdatedInformation(await this.getInformation());
  }

  private async getInformation(): Promise<Information> {
    const information = await this.informationRepository.find({
    });
    return information[0];
  }

  private checkNulls(address: string, phoneNumber: string, email: string): void {
    if(!address && !phoneNumber && !email) {
      throw new IllegalArgumentException('All fields are empty');
    }
  }
}

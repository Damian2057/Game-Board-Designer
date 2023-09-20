import { Injectable } from '@nestjs/common';
import { Information } from "../model/domain/information.entity";
import { InformationDto } from "../model/dto/information.dto";
import { mapInformationToUpdatedInformation } from "../util/util.functions";
import * as fs from "fs";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";

@Injectable()
export class InformationService {

  private readonly filePath = 'config.json';

  async updateAbout(address: string, phoneNumber: string, email: string, about: string, mission: string, facebook: string): Promise<InformationDto> {
    let information = await this.getInformation();
    await this.updateInformation(information, address, phoneNumber, email, about, mission, facebook);
    return mapInformationToUpdatedInformation(await this.getInformation());
  }

  async getAbout() {
    return mapInformationToUpdatedInformation(await this.getInformation());
  }

  private async getInformation(): Promise<Information> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }

  private async saveInformation(information: any): Promise<Information> {
    try {
      fs.writeFileSync(this.filePath, information, 'utf-8');
      return await this.getInformation();
    } catch (err) {
      throw new IllegalArgumentException(err)
    }
  }

  private async updateInformation(information: Information,
                                  address: string,
                                  phoneNumber: string,
                                  email: string,
                                  about: string,
                                  mission: string,
                                  facebook: string) {
    if (address != null) {
      information.address = address;
    }
    if (phoneNumber != null) {
      information.phoneNumber = phoneNumber;
    }
    if (email != null) {
      information.email = email;
    }
    if (about != null) {
      information.about = about;
    }
    if (mission != null) {
      information.mission = mission;
    }
    if (facebook != null) {
      information.facebook = facebook;
    }
    await this.saveInformation(JSON.stringify(information));
  }
}

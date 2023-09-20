import { Information } from "../model/domain/information.entity";
import { InformationDto } from "../model/dto/information.dto";

export function mapInformationToUpdatedInformation(information: Information): InformationDto {
    return new InformationDto(information.address,
      information.phoneNumber,
      information.email,
      information.about,
      information.mission,
      information.facebook);
}
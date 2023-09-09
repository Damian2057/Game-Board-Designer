import { Information } from "../model/domain/information.entity";
import { UpdatedInformationDto } from "../model/dto/updated.information.dto";

export function mapInformationToUpdatedInformation(information: Information): UpdatedInformationDto {
    return new UpdatedInformationDto(information.address, information.phoneNumber, information.email);
}
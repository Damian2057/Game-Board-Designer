import { Information } from "../model/domain/information.entity";
import { UpdatedInformationCommand } from "../model/command/updated.information.command";

export function mapInformationToUpdatedInformation(information: Information): UpdatedInformationCommand {
    return new UpdatedInformationCommand(information.address, information.phoneNumber, information.email);
}
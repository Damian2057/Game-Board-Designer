import { PropertyDto } from "../../dto/property.dto";
import { ElementDto } from "../../dto/element.dto";
import { Status } from "../../domain/status.enum";
import { Priority } from "../../domain/priority.enum";

export class CreateContainerCommand {
  name: string;
  description: string;
  notes: string[];
  quantity: number;
  imageIds: number[];
  properties: PropertyDto[];
  elements: ElementDto[];
  status: Status;
  priority: Priority;
}
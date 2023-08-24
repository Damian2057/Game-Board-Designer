import { PropertyDto } from "../../dto/property.dto";
import { ElementDto } from "../../dto/element.dto";

export class CreateContainerCommand {
  name: string;
  description: string;
  notes: string[];
  quantity: number;
  imageIds: number[];
  properties: PropertyDto[];
  elements: ElementDto[];
}
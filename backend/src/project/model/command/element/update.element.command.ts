import { PropertyDto } from "../../dto/property.dto";

export class UpdateElementCommand {
  name: string;
  description: string;
  notes: string[];
  quantity: number;
  imageIds: number[];
  properties: PropertyDto[];
}
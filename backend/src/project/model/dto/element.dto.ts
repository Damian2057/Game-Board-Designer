import { PropertyDto } from "./property.dto";

export class ElementDto extends PropertyDto {
  id: number;
  name: string;
  description: string;
  notes: string[];
  quantity: number;
  properties: PropertyDto[];
  imageIds: number[];
}
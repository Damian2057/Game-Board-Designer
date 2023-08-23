import { PropertyDto } from "./property.dto";
import { AbstractTicketDto } from "./abstract.ticket.dto";

export class ElementDto extends AbstractTicketDto {
  id: number;
  name: string;
  description: string;
  notes: string[];
  quantity: number;
  properties: PropertyDto[];
  imageIds: number[];
}
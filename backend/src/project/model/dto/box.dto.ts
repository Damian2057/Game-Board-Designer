import { PropertyDto } from "./property.dto";
import { AbstractTicketDto } from "./abstract.ticket.dto";

export class BoxDto extends AbstractTicketDto {
  id: number;
  name: string;
  description: string;
  notes: string[];
  properties: PropertyDto[];
  imageIds: number[];
}
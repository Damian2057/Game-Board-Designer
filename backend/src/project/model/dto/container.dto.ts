import { AbstractTicketDto } from "./abstract.ticket.dto";
import { PropertyDto } from "./property.dto";
import { ElementDto } from "./element.dto";

export class ContainerDto extends AbstractTicketDto {
  id: number;
  name: string;
  description: string;
  notes: string[];
  elements: ElementDto[];
  quantity: number;
  imageIds: number[];
  properties: PropertyDto[];
}
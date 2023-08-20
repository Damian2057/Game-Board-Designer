import { AbstractTicketDto } from "./abstract.ticket.dto";

export class ContainerDto extends AbstractTicketDto {
  id: number;
  name: string;
  description: string;
  notes: string[];
  quantity: number;
  imageIds: number[];
}
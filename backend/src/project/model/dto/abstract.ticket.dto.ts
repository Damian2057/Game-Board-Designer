import { Status } from "../domain/status.enum";
import { Priority } from "../domain/priority.enum";

export class AbstractTicketDto {
  status: Status;
  priority: Priority;
}
import { AbstractTicketDto } from "./abstract.ticket.dto";
import { BoxDto } from "./box.dto";
import { ContainerDto } from "./container.dto";
import { ElementDto } from "./element.dto";
import { GameDto } from "../../../game/model/dto/game.dto";
import { UserDto } from "../../../users/model/dto/user.dto";

export class ProjectDto extends AbstractTicketDto {
  id: number;
  name: string;
  description: string;
  notes: string[];
  isTemplate: boolean;
  isCompleted: boolean;
  imageIds: number[];

  box: BoxDto;
  containers: ContainerDto[];
  elements: ElementDto[];
  currentGame: GameDto;
  games: GameDto[];
  user: UserDto;
}
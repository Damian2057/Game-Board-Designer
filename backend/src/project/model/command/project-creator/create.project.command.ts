import { BoxDto } from "../../dto/box.dto";
import { ContainerDto } from "../../dto/container.dto";
import { ElementDto } from "../../dto/element.dto";
import { GameDto } from "../../../../game/model/dto/game.dto";

export class CreateProjectCommand {
  name: string;
  description: string;
  notes: string[];
  box: BoxDto;
  containers: ContainerDto[];
  elements: ElementDto[];
  games: GameDto[];
  currentGame: GameDto;
  isTemplate: boolean;
  imageIds: number[];
  isCompleted: boolean;
}
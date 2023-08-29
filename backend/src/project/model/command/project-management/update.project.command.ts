import { GameDto } from "../../../../game/model/dto/game.dto";

export class UpdateProjectCommand {
  name: string;
  description: string;
  notes: string[];
  games: GameDto[];
  imageIds: number[];
}
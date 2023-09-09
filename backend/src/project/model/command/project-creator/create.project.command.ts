import { BoxDto } from "../../dto/box.dto";
import { ContainerDto } from "../../dto/container.dto";
import { ElementDto } from "../../dto/element.dto";
import { GameDto } from "../../../../game/model/dto/game.dto";
import { ArrayMinSize, IsString, Length } from "class-validator";
import { OrderDto } from "../../../../order/model/dto/order.dto";

export class CreateProjectCommand {

  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(10, 2000)
  description: string;

  notes: string[];

  box: BoxDto;

  containers: ContainerDto[];

  elements: ElementDto[];

  @ArrayMinSize(1)
  games: GameDto[];

  @ArrayMinSize(1)
  imageIds: number[];

  order: OrderDto;
}
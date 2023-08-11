import { ArrayMinSize, IsString, Length, Min } from "class-validator";
import { TagDto } from "../dto/tag.dto";
import { GameElementDto } from "../dto/game-element.dto";

export class CreateBoardGameCommand {

  @IsString()
  @Length(3, 2000)
  title: string

  @IsString()
  @Length(3, 2000)
  description: string

  @IsString()
  @Length(6, 20)
  publicationDate: string

  @Min(0)
  price: number

  @ArrayMinSize(1)
  tags: TagDto[]

  @ArrayMinSize(1)
  gameElements: GameElementDto[]

}
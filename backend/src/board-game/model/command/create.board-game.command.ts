import { ArrayMinSize, IsString, Length, Min } from "class-validator";
import { Tag } from "../domain/tag.entity";
import { GameElement } from "../domain/game.element.entity";

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
  tags: Tag[]

  @ArrayMinSize(1)
  gameElements: GameElement[]

}
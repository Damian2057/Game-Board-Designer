import { Length, Min } from "class-validator";

export class UpdateBoardGameElementCommand {

  @Length(3, 100)
  name: string

  @Min(1)
  quantity: number
}
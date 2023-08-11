import { Length, Min } from "class-validator";

export class CreateBoardGameElementCommand {

  @Length(3, 100)
  name: string

  @Min(1)
  quantity: number
}
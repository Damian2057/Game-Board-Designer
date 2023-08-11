import { Tag } from "../domain/tag.entity";

export class UpdateBoardGameCommand {

  title: string
  description: string
  publicationDate: string
  price: number
  tags: Tag[]
}
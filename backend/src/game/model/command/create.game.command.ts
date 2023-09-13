import { ArrayMinSize, IsString, Length, Min } from "class-validator";
import { TagDto } from "../dto/tag.dto";
import { ComponentDto } from "../dto/component.dto";

export class CreateGameCommand {

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
  components: ComponentDto[]

  @ArrayMinSize(1)
  imageIds: number[]
}
import { PropertyDto } from "../../dto/property.dto";
import { ArrayMinSize, IsString, Length } from "class-validator";

export class CreateBoxCommand {

  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(10, 2000)
  description: string;

  notes: string[];

  @ArrayMinSize(1)
  properties: PropertyDto[];

  @ArrayMinSize(1)
  imageIds: number[];
}
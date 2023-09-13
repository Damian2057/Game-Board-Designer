import { PropertyDto } from "../../dto/property.dto";
import { ArrayMinSize, IsString, Length, Min } from "class-validator";
import { Status } from "../../domain/status.enum";
import { Priority } from "../../domain/priority.enum";

export class CreateElementCommand {

  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(10, 2000)
  description: string;

  notes: string[];

  @Min(1)
  quantity: number;

  @ArrayMinSize(1)
  imageIds: number[];

  @ArrayMinSize(1)
  properties: PropertyDto[];

  status: Status;

  priority: Priority;
}
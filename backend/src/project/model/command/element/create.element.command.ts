import { PropertyDto } from "../../dto/property.dto";
import { ArrayMinSize, IsString, Min } from "class-validator";
import { Status } from "../../domain/status.enum";
import { Priority } from "../../domain/priority.enum";

export class CreateElementCommand {

  @IsString()
  name: string;

  @IsString()
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
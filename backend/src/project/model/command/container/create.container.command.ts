import { PropertyDto } from "../../dto/property.dto";
import { ElementDto } from "../../dto/element.dto";
import { Status } from "../../domain/status.enum";
import { Priority } from "../../domain/priority.enum";
import { ArrayMinSize, IsString, Length, Min } from "class-validator";

export class CreateContainerCommand {

  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(10, 2000)
  description: string;

  notes: string[];

  @Min(0)
  quantity: number;

  @ArrayMinSize(1)
  imageIds: number[];

  @ArrayMinSize(1)
  properties: PropertyDto[];

  @ArrayMinSize(1)
  elements: ElementDto[];

  status: Status;

  priority: Priority;
}
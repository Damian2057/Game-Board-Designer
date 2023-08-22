import { Controller } from "@nestjs/common";
import { ContainerService } from "../service/container.service";

@Controller('container')
export class ContainerController {

  constructor(
    private readonly containerService: ContainerService,
  ) {}


}

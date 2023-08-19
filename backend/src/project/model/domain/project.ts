import { Entity } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { Container } from "./container.entity";
import { Box } from "./box.entity";

@Entity()
export class Project extends AbstractEntity<Project>{

  name: string;
  description: string;
  notes: string[];
  box: Box;
  containers: Container[];
}
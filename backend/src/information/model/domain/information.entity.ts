import { AbstractEntity } from "../../../database/abstract.entity";
import { Length } from "class-validator";

export class Information extends AbstractEntity<Information> {

  @Length(3, 100)
  address: string;

  @Length(3, 20)
  phoneNumber: string;

  @Length(3, 50)
  email: string;

  @Length(3, 1000)
  about?: string;

  @Length(3, 1000)
  mission?: string;

  @Length(3, 1000)
  facebook?: string;
}
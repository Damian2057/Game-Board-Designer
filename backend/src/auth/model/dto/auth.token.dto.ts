import { UserDto } from "../../../users/model/dto/user.dto";

export class AuthTokenDto {
  expiresIn: string;
  token: string;
  refresh: string;
  user: UserDto;

  constructor(expiresIn: string, token: string, refresh?: string, user?: UserDto) {
    this.expiresIn = expiresIn;
    this.token = token;
    this.refresh = refresh;
    this.user = user;
  }
}
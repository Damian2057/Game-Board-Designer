export class AuthTokenDto {
  expiresIn: string;
  token: string;

  constructor(expiresIn: string, token: string) {
    this.expiresIn = expiresIn;
    this.token = token;
  }
}
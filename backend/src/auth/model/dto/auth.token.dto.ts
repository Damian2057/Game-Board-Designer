export class AuthTokenDto {
  expiresIn: string;
  token: string;
  refresh: string;

  constructor(expiresIn: string, token: string, refresh?: string) {
    this.expiresIn = expiresIn;
    this.token = token;
    this.refresh = refresh;
  }
}
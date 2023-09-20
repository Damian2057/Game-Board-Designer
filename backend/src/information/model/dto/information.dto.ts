export class InformationDto {

  constructor(
    public readonly address?: string,
    public readonly phoneNumber?: string,
    public readonly email?: string,
    public readonly about?: string,
    public readonly mission?: string,
    public readonly facebook?: string
  ) {}
}
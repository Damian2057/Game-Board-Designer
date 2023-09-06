export class UpdatedInformationCommand {
  constructor(
    public readonly address: string,
    public readonly phoneNumber: string,
    public readonly email: string,
  ) {}
}
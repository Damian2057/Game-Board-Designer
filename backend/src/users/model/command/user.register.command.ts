import { IsNotEmpty, IsString } from "class-validator";

export class UserRegisterCommand {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
}
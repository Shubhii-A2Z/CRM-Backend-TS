import { SignInDTO } from "@/dtos/SignInDTO";

export interface SignInStrategy{
    signIn(data: SignInDTO): Promise<any>;
}
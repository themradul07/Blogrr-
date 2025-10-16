import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";


@InputType()
export class SignInInput{

    @Field()
    email:string;

    @Field()
    @MinLength(1)
    password:string;

}
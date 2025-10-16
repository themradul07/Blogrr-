import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  
  @IsString()
  @Field()
  name:string;

  @IsString()
  @Field()
  password:string;

  @Field({nullable:true})
  bio?:string|'';

  @IsEmail()
  @Field()
  email:string;


  @Field({nullable:true})
  avatar?: string|'';

}

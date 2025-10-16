import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-In-Input.dto';
import { AuthPayload } from './entities/auth-payload.entity';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(()=>AuthPayload)
  async signIn(@Args("signInInput") signInInput: SignInInput){
   
    const user =  await this.authService.ValidateLocalUser(signInInput);
    const data = await this.authService.login(user);
  
    return data;
    


  }
}

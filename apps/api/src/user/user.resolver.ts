import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(()=>User)
  async createUser(@Args("createUserInput") createUserInput: CreateUserInput){
    return await this.userService.create(createUserInput);
  }

  
  @Query(()=>[User])
  async suggestedUsers(
    @Args("query" , {type : ()=>String , nullable:true}) query?: string ){
    return await this.userService.suggestedUser(query);
  }

}

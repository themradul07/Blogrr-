import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Post } from 'src/post/entities/post.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User)
  async createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User])
  async suggestedUsers(
    @Args("query", { type: () => String, nullable: true }) query?: string) {
    return await this.userService.suggestedUser(query);
  }

  @Query(() => User)
  async getUserDetails(@Args("UserId", { type: () => Int }) id: number) {
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async addFollower(
    @Args("followerId", { type: () => Int }) followerId: number,
    @Context() context,
  ) {
    const userId = context.req.user.id;
    return await this.userService.addFollower(userId, followerId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeFollower(
    @Args("followerId", { type: () => Int }) followerId: number,
    @Context() context,
  ) {
    const userId = context.req.user.id;
    return await this.userService.removeFollower(userId, followerId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  async isFollowing(
    @Args("followerId", { type: () => Int }) followerId: number,
    @Context() context,
  ) {
    const userId = context.req.user.id;
    return await this.userService.isFollowing(userId, followerId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post])
  async followingPosts(
    @Context() context,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    const userId = context.req.user.id;
    return await this.userService.followingPosts(userId, skip ,take);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async UpdateUser(
    @Context() context,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const userId = context.req.user.id;
    return await this.userService.updateUser(userId, updateUserInput);
  }

}

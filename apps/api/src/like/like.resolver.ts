import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Post } from 'src/post/entities/post.entity';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(()=>Boolean)
  async likePost(
    @Context() context,
    @Args("postId" , { type: ()=>Int}) postId: number, 
  ){
    const userId = context.req.user.id;
    return await this.likeService.likePost({postId , userId})
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(()=>Boolean)
  async unlikePost(
    @Context() context,
    @Args("postId" , { type: ()=>Int}) postId: number, 
  ){
    const userId = context.req.user.id;
    return await this.likeService.unlikePost({postId , userId})
  }

  @Query(()=>Int)
  async postLikesCount(
    @Args("postId" , { type: ()=>Int}) postId: number, 
  ){
    return this.likeService.getPostLikesCount(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(()=>Boolean)
  async userLikePost(
    @Context() context,
    @Args("postId" , { type: ()=>Int}) postId: number, 
  ){
    return this.likeService.userLikedPost({postId , userId:context.req.user.id});
  }

   @UseGuards(JwtAuthGuard)
  @Query(() => [Like])
  LikedPosts(
    @Context() context,  
  ) {
    const userId = context.req.user.id;
    return this.likeService.likedPosts({userId});
  }
}

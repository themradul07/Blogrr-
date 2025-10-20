import { Resolver, Query, Mutation, Args, Int, CONTEXT, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { skip } from 'rxjs';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { PaginationInput } from './dto/pagination.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) { }

  
  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number
  ) {
    
    return this.postService.findAll({ skip, take });
  }

   @Query(()=>[Post])
  async getAllPosts(
    @Args('pagination' , {type: ()=>PaginationInput , nullable:true}) pagination?:PaginationInput,
    @Args('search', {type: ()=>String ,nullable:true} ) search?:string,
    @Args('tags', {type: ()=>[String] ,nullable: true}) tags?: string[],
  ){

    return this.postService.getAllPosts({pagination , search, tags});

  }


  @Query(() => Int, { name: "postCount" })
  count() {
    return this.postService.count();
  }



  @Query(() => Post)
  getPostbyId(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post])
  getUserPosts(
    @Context() context,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    return this.postService.findbyuser({ userId: context.req.user.id, skip: skip ?? 0, take: take ?? DEFAULT_PAGE_SIZE })

  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int)
  userPostCount(
    @Context() context,
  ) {
    const userId = context.req.user.id;
    return this.postService.userPostCount(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  createPost(
    @Context() context,
    @Args('createPostInput') createPostInput: CreatePostInput
  ) {
    console.log("hitted the create successfully");
    const authorId = context.req.user.id;
    return this.postService.create({ createPostInput, authorId })

  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  updatePost(
    @Context() context,
    @Args('updatePostInput') updatePostInput: UpdatePostInput
  ) {
    console.log("hitted the update successfully");
    const userId = context.req.user.id;
    return this.postService.update({ userId, updatePostInput });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  deletePost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number,
  ) {

    const userId = context.req.user.id;
    return this.postService.delete({ userId, postId });
  }

  @Query(() => [Post])
  getReleatedPost(
    @Args('postId', { type: () => Int }) postId: number,
  ) {
    return this.postService.getRelatedPosts(postId);
  }

  





}

import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  postId: number;

  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  content: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  thumbnail?: string;

  @IsString({ each: true })
  @Field(() => [String])
  tags: string[];

  @IsBoolean()
  @Field(() => Boolean)
  published: boolean;
}

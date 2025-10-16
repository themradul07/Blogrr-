import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Count {
  @Field(()=>Int)
  likes: number;

  @Field(()=>Int)
  comments: number;
}


@ObjectType()
export class Post {
 
  @Field(()=>Int)
  id:number;

  @Field({nullable: true})
  slug?: string;

  @Field()
  title:string

  @Field()
  content: string;

  @Field({nullable:true})
  thumbnail?: string;

  @Field(()=>Boolean)
  published: boolean;

  @Field(()=>User)
  author:User;

  @Field(()=>[Tag])
  tags: Tag[];

  @Field(()=>[CommentEntity])
  comments : CommentEntity[];

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(()=>Count)
  _count: Count;
}


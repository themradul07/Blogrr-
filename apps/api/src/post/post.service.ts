import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  generateSlug(title: string): string {
    return title.toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
  async findAll({ skip = 0, take = DEFAULT_PAGE_SIZE }: { skip?: number, take?: number }) {
    return await this.prisma.post.findMany({
      skip,
      take
    });
  }

  async count() {
    return await this.prisma.post.count();
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        id: id
      },
      include: {
        author: true,
        tags: true,
      }
    })
  }

  async findbyuser({
    userId,
    skip,
    take
  }: {
    userId: number,
    skip?: number,
    take?: number
  }) {
    return await this.prisma.post.findMany({
      where: {
        author: {
          id: userId,
        }
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        published: true,
        slug: true,
        title: true,
        thumbnail: true,
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      },
      skip,
      take,
    })
  }

  async userPostCount(userId: number) {
    return this.prisma.post.count({

      where: {
        authorId: userId,
      }
    })
  }

  async create({
    createPostInput,
    authorId
  }: {
    createPostInput: CreatePostInput,
    authorId: number
  }) {
    const slug = this.generateSlug(createPostInput.title);
    return await this.prisma.post.create({
      data: {
        ...createPostInput,
        slug,
        author: {
          connect: {
            id: authorId,
          }
        },
        tags: {
          connectOrCreate: createPostInput.tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      }
    })
  }

  async update({
    updatePostInput,
    userId
  }: {
    updatePostInput: UpdatePostInput,
    userId: number
  }) {
    
    const authorIdMatched = await this.prisma.post.findUnique({
      where:{
        id: updatePostInput.postId,
        authorId: userId
      }     
    });

    if(!authorIdMatched) throw new UnauthorizedException();

    const {postId,...restdata} = updatePostInput;

    return await this.prisma.post.update({

      where:{
        id: updatePostInput.postId,
      },

      data:{
        ...restdata,
        tags:{
          set:[],
          connectOrCreate: updatePostInput.tags?.map((tag)=>({
            where: {name: tag},
            create: {name: tag},
          })),
        }
      }
    })
  }

  async delete({
  postId,
    userId
  }: {
   postId: number
    userId: number
  }){

     const authorIdMatched = await this.prisma.post.findUnique({
      where:{
        id: postId,
        authorId: userId
      }     
    });
    if(!authorIdMatched) throw new UnauthorizedException();

    const data = await this.prisma.post.delete({where:{id: postId}});
    console.log("After deleting the result is", data);
    return !!data;

  }

}

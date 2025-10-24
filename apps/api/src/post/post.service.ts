import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Prisma } from 'generated/prisma';
import { contains } from 'class-validator';

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
      take,
      orderBy: { createdAt: 'desc' },
       include: {
        author: true,
        tags: true,
      },

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
      where: {
        id: updatePostInput.postId,
        authorId: userId
      }
    });

    if (!authorIdMatched) throw new UnauthorizedException();

    const { postId, ...restdata } = updatePostInput;

    return await this.prisma.post.update({

      where: {
        id: updatePostInput.postId,
      },

      data: {
        ...restdata,
        tags: {
          set: [],
          connectOrCreate: updatePostInput.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
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
  }) {

    const authorIdMatched = await this.prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId
      }
    });
    if (!authorIdMatched) throw new UnauthorizedException();

    const data = await this.prisma.post.delete({ where: { id: postId } });
    
    return !!data;

  }

  async getRelatedPosts(postId: number) {

    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: { tags: true },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const tagNames = post.tags.map((t) => t.name);

    // ✅ Define correct Prisma type for posts with author + tags
    type PostWithAuthorAndTags = Prisma.PostGetPayload<{
      include: { author: true; tags: true };
    }>;

    let relatedPosts: PostWithAuthorAndTags[] = [];

    // ✅ Find related posts based on shared tags
    if (tagNames.length > 0) {
      relatedPosts = await this.prisma.post.findMany({
        where: {
          id: { not: postId },
          tags: { some: { name: { in: tagNames } } },
        },
        include: { author: true, tags: true },
        take: 3,
      });
    }


    if (relatedPosts.length === 0) {
      relatedPosts = await this.prisma.post.findMany({
        where: { id: { not: postId } },
        include: { author: true, tags: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      });
    }

    return relatedPosts;
  }

  // async getAllPosts({ pagination, search, tags }) {
  //   const { skip = 0, take = 12 } = pagination || {};

  //   return this.prisma.post.findMany({
  //     where: {
  //       AND: [
  //         search
  //           ? {
  //               OR: [
  //                 { title: { contains: search } },
  //                 { content: { contains: search } },
  //               ],
  //             }
  //           : {},
  //         tags && tags.length > 0
  //           ? {
  //               tags: {
  //                 some: {
  //                   name: { in: tags },
  //                 },
  //               },
  //             }
  //           : {},
  //       ],
  //     },
  //     include: {
  //       author: true,
  //       tags: true,
  //     },
  //     skip,
  //     take,
  //     orderBy: { createdAt: 'desc' },
  //   });
  // }

  async getAllPosts({ pagination, search, tags }) {
    const { skip = 0, take = 12 } = pagination || {};

    return this.prisma.post.findMany({
      where: {
        AND: [
          search
            ? {
              OR: [
                { title: { contains: search } },
                { content: { contains: search } },
              ]
            }
            : {},

          tags && tags.length > 0
            ? {
              tags: {
                some: {
                  name: { in: tags },
                },
              },
            }
            : {},
        ]
      },
      include: {
        author: true,
        tags: true,
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' }
    })
  }



}

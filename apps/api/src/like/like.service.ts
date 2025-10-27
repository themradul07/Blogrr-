import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {

  constructor(private readonly prisma: PrismaService) { }

  async likePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      await this.prisma.like.create({
        data: { userId, postId },
      });
      return true;
    } catch (e) {
      console.error(e);
      throw new BadRequestException("An error occurred while liking the post");
      return false;
    }
  }


  async unlikePost({ postId, userId }: {
    postId: number,
    userId: number
  }) {

    try {
      return !!await this.prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      })

    } catch (e) {

      throw new BadRequestException("Like Not found")

    }

  }

  async getPostLikesCount(postId: number) {
    return this.prisma.like.count({
      where: {
        postId,
      }
    })
  }

  async userLikedPost({ postId, userId }: { postId: number, userId: number }) {
    const like = await this.prisma.like.findFirst({
      where: {
        postId,
        userId
      }
    })

    return !!like;
  }

  async likedPosts({ userId }: { userId: number }) {

    return await this.prisma.like.findMany({
      where: { userId: userId },
      include: {
        post: {
          include: {
            author: true,
          }

        }
      }});


  }
}

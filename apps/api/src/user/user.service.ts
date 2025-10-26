import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async create(createUserInput: CreateUserInput) {

    createUserInput.password = await hash(createUserInput.password);


    return await this.prisma.user.create({
      data: createUserInput
    });

  }

  async suggestedUser(query?: string) {
    return await this.prisma.user.findMany({
      where: query
        ? {
          OR: [{ name: { contains: query } }],
        }
        : {},
      take: 3,
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        posts: {
          include: {
            author: true,
          },
        },
      }
    });
  }



  async addFollower(userId: number, followerId: number) {
    const data = await this.prisma.user.update({
      where: { id: userId },
      data: {
        following: {
          connect: { id: followerId }
        }
      }
    });
    return !!data;
  }

  async removeFollower(userId: number, followerId: number) {
    const data = await this.prisma.user.update({
      where: { id: userId },
      data: {
        following: {
          disconnect: { id: followerId }
        }
      }
    });
    return !!data;
  }

  async isFollowing(userId: number, followerId: number) {
    const data = await this.prisma.user.findFirst({
      where: {
        id: userId,
        following: {
          some: { id: followerId }
        }
      }
    });
    return !!data;
  }

  async followingPosts(userId: number, skip?: number, take?: number) {

    const followedUsers = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { following: { select: { id: true } } },
    });

    const followingIds = followedUsers?.following.map(u => u.id) || [];


    const posts = await this.prisma.post.findMany({
      where: {
        authorId: { in: followingIds },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: skip??0 ,
      take: take??12,
    });

    return posts;
  }

  async updateUser(userId: number, updateUserInput: UpdateUserInput) {
     
    
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...updateUserInput,
      },
    });
  }

}

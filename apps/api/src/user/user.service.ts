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

}

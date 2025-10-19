import { Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {


  constructor(private readonly prisma: PrismaService){}

  
  async getAllTags(){

    return this.prisma.tag.findMany({

    })
  }

async getPopularTags() {
  return this.prisma.tag.findMany({
    take: 15, // only top 15 tags
    orderBy: {
      posts: {
        _count: 'desc', // sort by number of posts (descending)
      },
    },
   
  });
}

  
}

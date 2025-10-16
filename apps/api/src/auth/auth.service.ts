import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInInput } from './dto/sign-In-Input.dto';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { User } from 'generated/prisma';
import { CreateUserInput } from 'src/user/dto/create-user.input';



@Injectable()
export class AuthService {

    constructor(private prisma:PrismaService, private jwtService: JwtService){}

    async ValidateLocalUser({email ,password}:SignInInput){
        const user = await this.prisma.user.findUnique({
            where : {
                email:email,
            }
        })

        if(!user) throw new UnauthorizedException('User Not Found');
        if(!user.password) throw new UnauthorizedException('User password not set');

        const matchpassword = await verify(user.password, password);
        if(!matchpassword) throw new UnauthorizedException('Invalid Credentials');

        return user;
    }

    async generateToken(userId: number){
        const payload: AuthJwtPayload = {sub: userId};
        const accessToken =await this.jwtService.signAsync(payload);
        return {accessToken};
    }

    async login(user: User){
        const {accessToken} = await this.generateToken(user.id);
       
        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            accessToken: accessToken
        }
    }

    async validateJwtUser(userid:number){
        const user = await this.prisma.user.findUnique({
            where:{
                id: userid
            }
        })

        if(!user) throw new UnauthorizedException('User not Found');
        const currentUser = { id: user.id};
        return currentUser;
    }

    async validateGoogleUser(googleUser: CreateUserInput){
        const user = await this.prisma.user.findUnique({       
            where:{
                email: googleUser.email,
            }
        });

        if(user) {
            const { password  ,...authUser} = user;
            return authUser;        
        } 
        
        const dbuser =  await this.prisma.user.create({
            data:{
                ...googleUser,
            }
        });

        const {password , ...authUser} = dbuser;

        return authUser;
    }


}

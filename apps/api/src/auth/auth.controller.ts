import { Controller, Get, Req, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authservice:AuthService){}

    @UseGuards(GoogleAuthGuard)
    @Get("google/login")
    googleLogin(){}

    @UseGuards(GoogleAuthGuard)
    @Get("google/callback")
    async googleCallback(@Request() req, @Res() res:Response){
        
        const userData = await this.authservice.login(req.user);
        

        res.redirect(`http://localhost:3000/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`)
    }
}

import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private configService: ConfigService,
        private authService: AuthService,
    ){
    const jwtSecret = configService.get<string>("JWT_SECRET");
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
        ignoreExpiration: false,
    });    
    }

    validate(payload: AuthJwtPayload){
        const userid = payload.sub;
        return this.authService.validateJwtUser(userid);
        
    }
}
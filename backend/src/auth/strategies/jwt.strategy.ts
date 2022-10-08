import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectModel(User.name) 
        private readonly userModel: Model<User>,
        configService: ConfigService
    ) {
        const secret = configService.get('JWT_SECRET');
        if(!secret) throw new Error('JWT_SECRET no esta definido');
        super({
            secretOrKey: secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User>{
        const {id} = payload;
        const user = await this.userModel.findById(id);
        if(!user || !user.isActive) throw new UnauthorizedException('token no valido');
        return user;
    }

}
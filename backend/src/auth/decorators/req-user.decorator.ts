import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const ReqUser = createParamDecorator(
    (data: keyof User,ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        if(!user) throw new InternalServerErrorException('usuario no encontrado en el request');
        if(!data) return user;
        return user[data]
    }
)
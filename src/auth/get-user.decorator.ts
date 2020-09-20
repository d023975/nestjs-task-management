import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, req): User => {
    return req.user;
  },
);

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
//     const req = ctx.switchToHttp().getRequest();
//     return req.user;
//  });

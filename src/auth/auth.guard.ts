import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';



@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {// useing passport jwt {use jwt strategy to protect routes} (automatically{extract valid token and attaches user to req})
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [
        context.getHandler(),// yesla login profile pass garcha
        context.getClass(),// authresolver userresolver
      ],
    );

    if (isPublic) {
      return true; 
    }

    return super.canActivate(context);
  }

 getRequest(context: ExecutionContext) {
  const ctx = GqlExecutionContext.create(context);// executioncontext generic hunchha so graphql le req diff form ma store garcha so i cover here using GqlExecutionContext.create(context){ thsi executioncontext is used in guard}(in guard check rout metadata , extract request, decide allo or blick)
  const request = ctx.getContext().req;
  return request;
}
}

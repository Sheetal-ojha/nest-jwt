import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    
    

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new UnauthorizedException("Token missing");

    try {
      const payload = this.jwtService.verify(token);
      req.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
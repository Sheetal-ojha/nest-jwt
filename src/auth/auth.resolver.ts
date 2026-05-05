import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';
// import { UserType } from '../users/dto/create-user.input';
import { UserType } from '../users/dto/user.type';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { UserEntity } from '../users/user.entity';
import { Public } from './decorators/public.decorator';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}


  @Public()
  @Mutation(() => UserType)   
  signup(@Args('input') input: RegisterInput) {
      console.log("RESOLVER INPUT:", input);

    return this.authService.signUp(input);
  }


  @Public()
  @Mutation(() => AuthResponse)
  login(@Args('input') input: LoginInput) {
    return this.authService.signIn(input.email, input.password);
  }
}


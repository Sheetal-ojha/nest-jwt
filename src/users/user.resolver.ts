import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UserType } from './dto/user.type';
import { ProfileType } from './dto/profile.type';
import { ResetPasswordInput } from './dto/reset-password.input';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @Query(() => [UserEntity])
  users() {
    return this.userService.findAll();
  }

  @Roles(Role.ADMIN, Role.USER)
  @Query(() => UserEntity)
  getUserByUsername(@Args('username') username: string) {
    return this.userService.findByUsername(username);
  }

  // get my profile
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Query(() =>ProfileType)  
  getMyProfile(@CurrentUser() user: any) {
    return this.userService.getProfile(user.userId);
  }

  //  update my profile
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Mutation(() => UserEntity)
  updateProfile(
    @Args('input') input: UpdateProfileInput,
    @CurrentUser() user: any,
  ) {
    return this.userService.updateProfile(user.userId, input);
  }
  @Mutation(() => String)
resetPassword(@Args('input') input: ResetPasswordInput) {
  return this.userService.resetPassword(input);
}
}
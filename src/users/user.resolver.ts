import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserType } from './dto/user.type';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}

  
   @Roles(Role.ADMIN)
  @Query(() => [UserEntity])
  users() {
    return this.userService.findAll();
  }


  // @Query(() => UserEntity)
  // user(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.findById(id);
  // }


 @Roles(Role.ADMIN, Role.USER)
  @Query(()=> UserType)
  getUserByUsername(@Args('username')
username: string){
  return this.userService.findByUsername(username);
}
}
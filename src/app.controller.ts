import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/public.decorator';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService, // ✅ inject both
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('auth/google')
  async googleAuth() {}

    @Public()
  @Get('test-oauth')
  testOAuth(@Res() res: any) {
    res.sendFile(join(process.cwd(), 'test-oauth.html'));
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('auth/google/callback')
  async googleCallback(@Req() req: any, @Res() res: any) {
    const tokens = await this.authService.googleLogin(req.user);

    res.redirect(
      `http://localhost:4000/test-oauth.html?access_token=${tokens.access_token}`,
      
      // `http://localhost:5173/auth/callback?access_token=${tokens.access_token}`,
    );
  }
}
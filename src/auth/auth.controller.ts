import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('google')
  //@UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    // This route initiates the Google OAuth flow
  }

  @Get('callback/google')
  //@UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // Extract the user from the request
    const user = req.user as any;

    // Ensure the user object contains the access token
    if (!user || !user.access_token) {
      return res.status(400).send('Error: No access token found');
    }

    // Redirect to the frontend with the token
    return res.redirect(
      `http://localhost:3000/auth/callback?token=${user.access_token}`,
    );
  }
}

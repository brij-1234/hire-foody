import { Controller, Get, Post, Body, Req, UseGuards, Request,HttpCode,
  HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserInput } from 'src/user/dto/user.input';
import { LoginInput } from 'src/user/dto/login.input';
import { AuthService } from './auth.service';
//import { AuthGuard } from './auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
@Controller('auth')
export class AuthController {
    constructor(private readonly userService:UserService,
                private readonly authService:AuthService
    ){}

    @Public()
    @Post('register')
    async register(@Body() userData: UserInput) {
        return this.userService.createUser(userData);
    }
    
    @Public()
    @Post('login')
    async login(@Body() loginInput: LoginInput){
        return this.authService.signIn(loginInput.email, loginInput.password); 
    }

    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}

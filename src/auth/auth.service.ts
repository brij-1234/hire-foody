import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,
         private jwtService: JwtService
     ){}
    
    async signIn(email: string, password: string): Promise<any> {
        const t1 = Date.now();
        const user = await this.userService.findOne(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        console.log('DB:', Date.now() - t1);

        const t2 = Date.now();
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Bcrypt:', Date.now() - t2);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id.toString(), username: user.name };

       
        return {
            
            access_token: await this.jwtService.signAsync(payload),
            
        };


    }
}

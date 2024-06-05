import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService){
        
    }

    async validateUser(username: string, password: string): Promise<any> {
        
        const user = await this.usersService.findByEmail(username);
       

        if (user && user.password === password) {
            const {password, ...result} = user
            return result
        }
        return null
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id};
        return {
          access_token: "Bearer" + " " + this.jwtService.sign(payload),
        };
    }
}
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../resources/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'adress', password: 'password' });
  }

  async validate(adress: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(adress, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

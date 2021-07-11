import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async validateUser(adress: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { adress } });
    const isRightPassword = await bcrypt.compare(password, user.password);
    if (user && isRightPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

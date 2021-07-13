import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { adress, password, nickname, userPic } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.userRepository.save({
      adress,
      password: hashedPassword,
      nickname,
      userPic,
    });
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const users = await this.userRepository.findOne({
      where: { id },
    });
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }
    const updatedUser = this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: number) {
    const softDeleted = await this.userRepository.softDelete(id);
    return softDeleted;
  }
}

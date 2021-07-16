import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user/entities/user.entity';
import { getManager, Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Groups } from 'src/group/entities/group.entity';
import { Diaries } from 'src/diary/entities/diary.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { adress, password, nickname, userPic } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 12);

    const group = new Groups();
    group.name = '내게쓰기';
    group.password = hashedPassword;
    group.readonly = 1;

    const user = new Users();
    user.adress = adress;
    user.password = hashedPassword;
    user.nickname = nickname;
    user.userPic = userPic;
    user.groups = [group];

    const diary = new Diaries();
    diary.title = '오신 것을 환영합니다!';
    diary.content = '좋은 문화를 만들어요!';
    diary.user = user;
    diary.groups = [group];

    await getManager().transaction(async (transactionEntityManager) => {
      await transactionEntityManager.save(group);
      await transactionEntityManager.save(user);
      await transactionEntityManager.save(diary);
    });

    return user;
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

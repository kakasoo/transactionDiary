import { Groups } from '../../group/entities/group.entity';
import { Users } from '../../user/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const password = await bcrypt.hash('1234567890', 12);
    const group = new Groups();
    group.name = 'myself';
    await connection.getRepository(Groups).save(group);

    const user = new Users();
    user.adress = '12345@naver.com';
    user.password = password;
    user.nickname = 'kaka';
    user.groups = [group];
    await connection.getRepository(Users).save(user);
  }
}

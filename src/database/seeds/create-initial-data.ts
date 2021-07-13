import { Groups } from '../../group/entities/group.entity';
import { Users } from '../../user/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // await connection
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Groups)
    //   .values([
    //     // { id: 1, name: 'everybody' },
    //     { id: 1, name: '내게쓰기' },
    //   ])
    //   .execute();

    // const group = await connection
    //   .getRepository(Groups)
    //   .find({ where: { id: 1 } });

    // // NOTE : seeding으로 만든 data는 production에 절대 유입되지 않도록 한다.
    const password = await bcrypt.hash('1234567890', 12);
    // await connection
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Users)
    //   .values([
    //     {
    //       id: 3,
    //       adress: '12345@naver.com',
    //       password: password,
    //       nickname: 'kaka',
    //       groups: <any>[group],
    //     },
    //   ])
    //   .execute();

    // NOTE : 위 방법으로는 user와 group 관계 테이블에 저장이 안 된다.
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

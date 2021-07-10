import { Groups } from '../../group/entities/group.entity';
import { Users } from '../../user/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Groups)
      .values([{ id: 1, name: 'everybody' }])
      .execute();

    // NOTE : seeding으로 만든 data는 production에 절대 유입되지 않도록 한다.
    await connection
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([
        {
          id: 1,
          adress: 'kscodebase@gmail.com',
          password: '1234567890',
          nickname: 'kakasoo',
        },
      ])
      .execute();
  }
}

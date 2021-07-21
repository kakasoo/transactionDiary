import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Groups } from './entities/group.entity';
import { UserGroups } from 'src/userGroup/entites/userGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Groups, UserGroups])],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}

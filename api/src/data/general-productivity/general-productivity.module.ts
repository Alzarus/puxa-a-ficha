import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralProductivityService } from './general-productivity.service';
import { GeneralProductivityController } from './general-productivity.controller';
import { GeneralProductivity } from './entities/general-productivity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralProductivity])],
  controllers: [GeneralProductivityController],
  providers: [GeneralProductivityService],
})
export class GeneralProductivityModule {}

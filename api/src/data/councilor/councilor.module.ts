import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouncilorService } from './councilor.service';
import { CouncilorController } from './councilor.controller';
import { Councilor } from './entities/councilor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Councilor])],
  controllers: [CouncilorController],
  providers: [CouncilorService],
})
export class CouncilorModule {}

import { Module } from '@nestjs/common';
import { CouncilorService } from './councilor.service';
import { CouncilorController } from './councilor.controller';

@Module({
  controllers: [CouncilorController],
  providers: [CouncilorService],
})
export class CouncilorModule {}

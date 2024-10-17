import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrequencyService } from './frequency.service';
import { FrequencyController } from './frequency.controller';
import { Frequency } from './entities/frequency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Frequency])],
  controllers: [FrequencyController],
  providers: [FrequencyService],
})
export class FrequencyModule {}

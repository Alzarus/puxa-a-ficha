import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropositionProductivityService } from './proposition-productivity.service';
import { PropositionProductivityController } from './proposition-productivity.controller';
import { PropositionProductivity } from './entities/proposition-productivity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropositionProductivity])],
  controllers: [PropositionProductivityController],
  providers: [PropositionProductivityService],
})
export class PropositionProductivityModule {}

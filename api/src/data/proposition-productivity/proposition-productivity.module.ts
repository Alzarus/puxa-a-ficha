import { Module } from '@nestjs/common';
import { PropositionProductivityService } from './proposition-productivity.service';
import { PropositionProductivityController } from './proposition-productivity.controller';

@Module({
  controllers: [PropositionProductivityController],
  providers: [PropositionProductivityService],
})
export class PropositionProductivityModule {}

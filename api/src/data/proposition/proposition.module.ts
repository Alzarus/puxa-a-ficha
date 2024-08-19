import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropositionService } from './proposition.service';
import { PropositionController } from './proposition.controller';
import { Proposition } from './entities/proposition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proposition])],
  controllers: [PropositionController],
  providers: [PropositionService],
})
export class PropositionModule {}

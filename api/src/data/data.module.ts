import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralProductivityModule } from './general-productivity/general-productivity.module';
import { CouncilorModule } from './councilor/councilor.module';
import { FrequencyModule } from './frequency/frequency.module';
import { PropositionProductivityModule } from './proposition-productivity/proposition-productivity.module';
import { PropositionModule } from './proposition/proposition.module';
import { Councilor } from './councilor/entities/councilor.entity';
import { Frequency } from './frequency/entities/frequency.entity';
import { GeneralProductivity } from './general-productivity/entities/general-productivity.entity';
import { PropositionProductivity } from './proposition-productivity/entities/proposition-productivity.entity';
import { Proposition } from './proposition/entities/proposition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Councilor,
      Frequency,
      GeneralProductivity,
      Proposition,
      PropositionProductivity,
    ]),
    GeneralProductivityModule,
    CouncilorModule,
    FrequencyModule,
    PropositionProductivityModule,
    PropositionModule,
  ],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class DataModule {}

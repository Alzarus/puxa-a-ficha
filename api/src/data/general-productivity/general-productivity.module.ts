import { Module } from '@nestjs/common';
import { GeneralProductivityService } from './general-productivity.service';
import { GeneralProductivityController } from './general-productivity.controller';

@Module({
  controllers: [GeneralProductivityController],
  providers: [GeneralProductivityService],
})
export class GeneralProductivityModule {}

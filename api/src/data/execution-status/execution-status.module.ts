import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionStatusService } from './execution-status.service';
import { ExecutionStatusController } from './execution-status.controller';
import { ExecutionStatus } from './entities/execution-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutionStatus])],
  controllers: [ExecutionStatusController],
  providers: [ExecutionStatusService],
})
export class ExecutionStatusModule {}

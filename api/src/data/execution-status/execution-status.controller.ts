import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExecutionStatusService } from './execution-status.service';
import { CreateExecutionStatusDto } from './dto/create-execution-status.dto';

@Controller('execution-status')
export class ExecutionStatusController {
  constructor(
    private readonly executionStatusService: ExecutionStatusService,
  ) {}

  @Get()
  async shouldExecute(): Promise<boolean> {
    return this.executionStatusService.shouldExecute('COMPLETED'); // Verifica se pode executar
  }

  @Post()
  async logExecution(
    @Body() createExecutionStatusDto: CreateExecutionStatusDto,
  ): Promise<void> {
    await this.executionStatusService.logExecution(createExecutionStatusDto); // Registra a execução
  }
}

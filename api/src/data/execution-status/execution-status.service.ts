import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecutionStatus } from './entities/execution-status.entity';
import { CreateExecutionStatusDto } from './dto/create-execution-status.dto';

@Injectable()
export class ExecutionStatusService {
  constructor(
    @InjectRepository(ExecutionStatus)
    private executionStatusRepository: Repository<ExecutionStatus>,
  ) {}

  async shouldExecute(status: string): Promise<boolean> {
    const lastExecution = await this.executionStatusRepository.findOne({
      where: { status },
      order: { executedAt: 'DESC' },
    });

    // Se não houve execução anterior, pode executar
    if (!lastExecution) {
      return true; // Não houve execução anterior
    }

    const lastExecutedDate = new Date(lastExecution.executedAt);
    const today = new Date(); // Data atual

    // Compare as datas, usando toDateString para ignorar a hora
    return lastExecutedDate.toDateString() !== today.toDateString();
  }

  async logExecution(
    createExecutionStatusDto: CreateExecutionStatusDto,
  ): Promise<void> {
    const executionStatus = this.executionStatusRepository.create(
      createExecutionStatusDto,
    );
    await this.executionStatusRepository.save(executionStatus); // Registra a nova execução
  }
}

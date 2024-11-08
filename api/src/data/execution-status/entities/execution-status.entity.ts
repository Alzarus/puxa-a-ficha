import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('execution_status')
export class ExecutionStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  status: string; // Ex.: PENDING, RUNNING, COMPLETED, ERROR

  @CreateDateColumn({ name: 'executed_at' })
  executedAt: Date;

  @UpdateDateColumn({ name: 'completed_at', nullable: true })
  completedAt?: Date;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string;
}

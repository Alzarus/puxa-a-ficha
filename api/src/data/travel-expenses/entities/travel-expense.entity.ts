import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('travel_expenses')
export class TravelExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  data: Date;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'varchar', length: 100 })
  usuario: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'varchar', length: 100 })
  localidade: string;

  @Column({ type: 'text', nullable: true })
  justificativa: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('travel_expenses')
export class TravelExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  @Column()
  tipo: string;

  @Column()
  usuario: string;

  @Column()
  valor: number;

  @Column()
  localidade: string;

  @Column({ type: 'text' })
  justificativa: string;
}

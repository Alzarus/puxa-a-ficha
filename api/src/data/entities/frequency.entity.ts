import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('frequencies')
export class Frequency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numeroSessao: string;

  @Column()
  anoSessao: string;

  @Column()
  nomeVereador: string;

  @Column()
  statusPresenca: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('frequencies')
export class Frequency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  numeroSessao: string;

  @Column({ type: 'varchar', length: 255 })
  anoSessao: string;

  @Column({ type: 'varchar', length: 255 })
  nomeAbreviado: string;

  @Column({ type: 'varchar', length: 100 })
  statusPresenca: string;
}

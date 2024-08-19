import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  numero: string;

  @Column({ type: 'varchar', length: 255 })
  contratante: string;

  @Column({ type: 'varchar', length: 255 })
  contratado: string;

  @Column({ type: 'text' })
  objeto: string;

  @Column({ type: 'decimal' })
  valor: number;

  @Column({ type: 'date' })
  dataAssinatura: Date;

  @Column({ type: 'varchar', length: 255 })
  vigencia: string;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string;
}

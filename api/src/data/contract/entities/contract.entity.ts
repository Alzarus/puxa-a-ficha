import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: string;

  @Column()
  contratante: string;

  @Column()
  contratado: string;

  @Column()
  objeto: string;

  @Column()
  valor: number;

  @Column()
  dataAssinatura: Date;

  @Column()
  vigencia: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  link: string;
}

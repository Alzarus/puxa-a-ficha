import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('general_productivity')
export class GeneralProductivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ano: number;

  @Column()
  parlamentarAutor: string;

  @Column({ type: 'int', nullable: true })
  emenda: number;

  @Column({ type: 'int', nullable: true })
  mensagem: number;

  @Column({ type: 'int', nullable: true })
  parecer: number;

  @Column({ type: 'int', nullable: true })
  relatoria: number;

  @Column({ type: 'int', nullable: true })
  substitutivo: number;

  @Column({ type: 'int', nullable: true })
  vistas: number;

  @Column({ type: 'int', nullable: true })
  votoRelator: number;

  @Column({ type: 'int' })
  total: number;

  @Column()
  tipo: string;
}

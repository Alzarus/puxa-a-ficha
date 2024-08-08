import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('general_productivities')
export class GeneralProductivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ano: number;

  @Column()
  parlamentarAutor: string;

  @Column()
  emenda: number;

  @Column()
  mensagem: number;

  @Column()
  parecer: number;

  @Column()
  relatoria: number;

  @Column()
  substitutivo: number;

  @Column()
  vistas: number;

  @Column()
  votoRelator: number;

  @Column()
  votoSeparado: number;

  @Column()
  total: number;

  @Column()
  tipo: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('councilors')
export class Councilor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 50 })
  partido: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkFoto: string;

  @Column({ type: 'boolean' })
  emAtividade: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nascimento: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  telefone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  enderecoDeGabinete: string;
}

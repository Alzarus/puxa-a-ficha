import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('proposition_productivities')
export class PropositionProductivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ano: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  parlamentarAutor: string;

  @Column({ type: 'int', nullable: true })
  mocao: number;

  @Column({ type: 'int', nullable: true })
  projetoDecretoLegislativo: number;

  @Column({ type: 'int', nullable: true })
  projetoEmendaLOM: number;

  @Column({ type: 'int', nullable: true })
  projetoIndicacao: number;

  @Column({ type: 'int', nullable: true })
  projetoLei: number;

  @Column({ type: 'int', nullable: true })
  projetoLeiComplementar: number;

  @Column({ type: 'int', nullable: true })
  projetoResolucao: number;

  @Column({ type: 'int', nullable: true })
  requerimentoAdministrativo: number;

  @Column({ type: 'int', nullable: true })
  requerimentoUrgenciaUrgentissima: number;

  @Column({ type: 'int', nullable: true })
  requerimentoUtilidadePublica: number;

  @Column({ type: 'int', nullable: true })
  requerimentoEspecial: number;

  @Column({ type: 'int', nullable: true })
  veto: number;

  @Column({ type: 'int' })
  total: number;

  @Column()
  tipo: string;
}

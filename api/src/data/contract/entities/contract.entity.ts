import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  numero_contrato: string;

  @Column({ type: 'varchar', length: 255 })
  nome_contratado: string;

  @Column({ type: 'date' })
  data_assinatura: Date;

  @Column({ type: 'date' })
  data_inicio: Date;

  @Column({ type: 'date' })
  data_fim: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  valor_contrato: number;

  @Column({ type: 'varchar', length: 255 })
  tempo_maximo_execucao: string;

  @Column({ type: 'date' })
  data_publicacao: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  diario_oficial: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link_pdf: string;
}

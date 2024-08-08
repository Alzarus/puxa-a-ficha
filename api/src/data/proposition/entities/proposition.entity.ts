import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('propositions')
export class Proposition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  proposicao: string;

  @Column()
  autorProposicao: string;

  @Column({ type: 'text' })
  ementa: string;

  @Column({ type: 'timestamp' })
  dataMovimentacao: Date;

  @Column()
  destino: string;

  @Column()
  situacaoFutura: string;

  @Column()
  autorDocumento: string;
}

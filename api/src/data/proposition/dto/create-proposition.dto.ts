import { IsString } from 'class-validator';

export class CreatePropositionDto {
  @IsString()
  proposicao: string;

  @IsString()
  autorproposicao: string;

  @IsString()
  pro_ementa: string;

  @IsString()
  tra_dt_movimentacao: string;

  @IsString()
  destino: string;

  @IsString()
  sit_nome_futuro: string;

  @IsString()
  autordoc: string;
}

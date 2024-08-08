import { IsString } from 'class-validator';

export class CreatePropositionDto {
  @IsString()
  proposicao: string;

  @IsString()
  autorproposicao: string;

  @IsString()
  proEmenta: string;

  @IsString()
  dataMovimentacao: string;

  @IsString()
  destino: string;

  @IsString()
  situacaoFutura: string;

  @IsString()
  autorDocumento: string;
}

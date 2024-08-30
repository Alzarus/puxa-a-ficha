import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateContractDto {
  @IsString()
  contrato: string;

  @IsString()
  cad_nome_completo: string;

  @IsDateString()
  con_dt_assinatura: Date;

  @IsDateString()
  con_dt_inicio: Date;

  @IsDateString()
  con_dt_final: Date;

  @IsNumber()
  con_valor: number;

  @IsString()
  con_tempo_maximo: string;

  @IsDateString()
  con_dt_publicacao: Date;

  @IsOptional()
  @IsString()
  diario?: string;

  @IsOptional()
  @IsString()
  pdf?: string;
}

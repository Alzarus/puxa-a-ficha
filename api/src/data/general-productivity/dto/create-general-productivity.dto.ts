import { IsString, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateGeneralProductivityDto {
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Ano': number;

  @IsString()
  'Parlamentar/Autor': string;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Emenda'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Mensagem'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Parecer'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Relatoria'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Substitutivo'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Vistas'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Voto do Relator'?: number;

  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Total': number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Voto em Separado'?: number;

  @IsString()
  'Tipo': string;
}

function parseCustom(value: string): number {
  const cleanValue = value.replace(/\./g, '');
  const parsed = parseInt(cleanValue, 10);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

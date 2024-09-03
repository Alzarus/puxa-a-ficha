import { IsInt, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePropositionProductivityDto {
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Ano': number;

  @IsString()
  'Parlamentar/Autor': string;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'MOC'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'PDL'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'PEL'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'PIN'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'PLC'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'PLE'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'PRE'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'RAD'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'RUU'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'REP'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'RUP'?: number;

  @IsOptional()
  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'VTO'?: number;

  @Transform(({ value }) => parseCustom(value))
  @IsInt()
  'Total': number;

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

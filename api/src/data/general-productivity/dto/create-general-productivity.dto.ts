import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateGeneralProductivityDto {
  @IsString()
  ano: string;

  @IsString()
  parlamentarAutor: string;

  @IsOptional()
  @IsInt()
  emenda?: number;

  @IsOptional()
  @IsInt()
  mensagem?: number;

  @IsOptional()
  @IsInt()
  parecer?: number;

  @IsOptional()
  @IsInt()
  relatoria?: number;

  @IsOptional()
  @IsInt()
  substitutivo?: number;

  @IsOptional()
  @IsInt()
  vistas?: number;

  @IsOptional()
  @IsInt()
  votoRelator?: number;

  @IsOptional()
  @IsInt()
  votoSeparado?: number;

  @IsInt()
  total: number;

  @IsString()
  tipo: string;
}

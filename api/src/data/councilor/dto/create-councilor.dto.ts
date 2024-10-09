import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CouncilorExtrasDto {
  @IsOptional()
  @IsString()
  nascimento?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  endereço_de_gabinete?: string;
}

export class CreateCouncilorDto {
  @IsString()
  nome: string;

  @IsString()
  partido: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  linkFoto?: string;

  @IsBoolean()
  emAtividade: boolean;

  @IsOptional()
  @Type(() => CouncilorExtrasDto)
  extras?: CouncilorExtrasDto;
}

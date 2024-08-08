import { IsString, IsBoolean, IsOptional } from 'class-validator';

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
  enderecoDeGabinete?: string;
}

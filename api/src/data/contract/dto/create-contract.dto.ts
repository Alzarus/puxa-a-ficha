import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateContractDto {
  @IsString()
  numero: string;

  @IsString()
  contratante: string;

  @IsString()
  contratado: string;

  @IsString()
  objeto: string;

  @IsNumber()
  valor: number;

  @IsDateString()
  dataAssinatura: string;

  @IsString()
  vigencia: string;

  @IsString()
  status: string;

  @IsString()
  @IsOptional()
  link: string;
}

import { IsString } from 'class-validator';

export class CreateFrequencyDto {
  @IsString()
  numeroSessao: string;

  @IsString()
  anoSessao: string;

  @IsString()
  nomeAbreviado: string;

  @IsString()
  statusPresenca: string;
}

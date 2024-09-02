import { IsString } from 'class-validator';

export class CreateFrequencyDto {
  @IsString()
  pre_ses_numero: string;

  @IsString()
  pre_ses_ano: string;

  @IsString()
  cad_cad_nome_abreviado: string;

  @IsString()
  pre_pre_presente: string;
}

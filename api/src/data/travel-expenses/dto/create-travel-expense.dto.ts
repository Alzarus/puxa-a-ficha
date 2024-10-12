import { IsString, IsNumber, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTravelExpenseDto {
  @IsDateString()
  @Transform(({ value }) => value.split('/').reverse().join('-'))
  data: string;

  @IsString()
  tipo: string;

  @IsString()
  usuario: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  valor: number;

  @IsString()
  localidade: string;

  @IsString()
  justificativa: string;
}

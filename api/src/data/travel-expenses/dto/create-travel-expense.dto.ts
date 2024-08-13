import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateTravelExpenseDto {
  @IsDateString()
  data: string;

  @IsString()
  tipo: string;

  @IsString()
  usuario: string;

  @IsNumber()
  valor: number;

  @IsString()
  localidade: string;

  @IsString()
  justificativa: string;
}

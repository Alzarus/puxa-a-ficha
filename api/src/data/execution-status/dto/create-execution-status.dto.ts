import { IsString, IsDateString } from 'class-validator';

export class CreateExecutionStatusDto {
  @IsString()
  crawlerName: string;

  @IsDateString()
  lastExecution: Date;

  @IsString()
  status: string;
}

import { IsInt } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';

export class UpdateContractDto extends PartialType(CreateContractDto) {
  @IsInt()
  id: number;
}

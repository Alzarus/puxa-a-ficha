import { PartialType } from '@nestjs/mapped-types';
import { CreateExecutionStatusDto } from './create-execution-status.dto';

export class UpdateExecutionStatusDto extends PartialType(
  CreateExecutionStatusDto,
) {}

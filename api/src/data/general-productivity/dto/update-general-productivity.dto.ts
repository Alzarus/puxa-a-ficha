import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneralProductivityDto } from './create-general-productivity.dto';

export class UpdateGeneralProductivityDto extends PartialType(
  CreateGeneralProductivityDto,
) {}

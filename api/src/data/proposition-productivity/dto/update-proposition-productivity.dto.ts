import { PartialType } from '@nestjs/mapped-types';
import { CreatePropositionProductivityDto } from './create-proposition-productivity.dto';

export class UpdatePropositionProductivityDto extends PartialType(CreatePropositionProductivityDto) {}

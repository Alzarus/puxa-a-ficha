import { PartialType } from '@nestjs/mapped-types';
import { CreatePropositionDto } from './create-proposition.dto';

export class UpdatePropositionDto extends PartialType(CreatePropositionDto) {}

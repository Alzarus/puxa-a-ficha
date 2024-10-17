import { PartialType } from '@nestjs/mapped-types';
import { CreateCouncilorDto } from './create-councilor.dto';

export class UpdateCouncilorDto extends PartialType(CreateCouncilorDto) {}

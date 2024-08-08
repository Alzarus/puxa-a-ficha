import { Injectable } from '@nestjs/common';
import { CreatePropositionProductivityDto } from './dto/create-proposition-productivity.dto';
import { UpdatePropositionProductivityDto } from './dto/update-proposition-productivity.dto';

@Injectable()
export class PropositionProductivityService {
  create(createPropositionProductivityDto: CreatePropositionProductivityDto) {
    return 'This action adds a new propositionProductivity';
  }

  findAll() {
    return `This action returns all propositionProductivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propositionProductivity`;
  }

  update(id: number, updatePropositionProductivityDto: UpdatePropositionProductivityDto) {
    return `This action updates a #${id} propositionProductivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} propositionProductivity`;
  }
}

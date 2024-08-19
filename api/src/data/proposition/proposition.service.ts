import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropositionDto } from './dto/create-proposition.dto';
import { UpdatePropositionDto } from './dto/update-proposition.dto';
import { Proposition } from './entities/proposition.entity';

@Injectable()
export class PropositionService {
  constructor(
    @InjectRepository(Proposition)
    private propositionRepository: Repository<Proposition>,
  ) {}

  create(createPropositionDto: CreatePropositionDto): Promise<Proposition> {
    const proposition = this.propositionRepository.create(createPropositionDto);
    return this.propositionRepository.save(proposition);
  }

  findAll(): Promise<Proposition[]> {
    return this.propositionRepository.find();
  }

  findOne(id: number): Promise<Proposition> {
    return this.propositionRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updatePropositionDto: UpdatePropositionDto,
  ): Promise<Proposition> {
    await this.propositionRepository.update(id, updatePropositionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.propositionRepository.delete(id);
  }
}

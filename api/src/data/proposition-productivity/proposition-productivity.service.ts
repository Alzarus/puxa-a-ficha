import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropositionProductivityDto } from './dto/create-proposition-productivity.dto';
import { UpdatePropositionProductivityDto } from './dto/update-proposition-productivity.dto';
import { PropositionProductivity } from './entities/proposition-productivity.entity';

@Injectable()
export class PropositionProductivityService {
  constructor(
    @InjectRepository(PropositionProductivity)
    private readonly propositionProductivityRepository: Repository<PropositionProductivity>,
  ) {}

  create(
    createPropositionProductivityDto: CreatePropositionProductivityDto,
  ): Promise<PropositionProductivity> {
    const propositionProductivity =
      this.propositionProductivityRepository.create(
        createPropositionProductivityDto,
      );
    return this.propositionProductivityRepository.save(propositionProductivity);
  }

  findAll(): Promise<PropositionProductivity[]> {
    return this.propositionProductivityRepository.find();
  }

  async findOne(id: number): Promise<PropositionProductivity> {
    const propositionProductivity =
      await this.propositionProductivityRepository.findOneBy({ id });
    if (!propositionProductivity) {
      throw new NotFoundException(
        `PropositionProductivity with ID ${id} not found`,
      );
    }
    return propositionProductivity;
  }

  async update(
    id: number,
    updatePropositionProductivityDto: UpdatePropositionProductivityDto,
  ): Promise<PropositionProductivity> {
    await this.propositionProductivityRepository.update(
      id,
      updatePropositionProductivityDto,
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.propositionProductivityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `PropositionProductivity with ID ${id} not found`,
      );
    }
  }
}

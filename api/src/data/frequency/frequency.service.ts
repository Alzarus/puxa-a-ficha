import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFrequencyDto } from './dto/create-frequency.dto';
import { UpdateFrequencyDto } from './dto/update-frequency.dto';
import { Frequency } from './entities/frequency.entity';

@Injectable()
export class FrequencyService {
  constructor(
    @InjectRepository(Frequency)
    private readonly frequencyRepository: Repository<Frequency>,
  ) {}

  async create(createFrequencyDto: CreateFrequencyDto): Promise<Frequency> {
    const frequency = this.frequencyRepository.create(createFrequencyDto);
    return this.frequencyRepository.save(frequency);
  }

  async createMany(
    createFrequencyDtos: CreateFrequencyDto[],
  ): Promise<Frequency[]> {
    const frequencies = this.frequencyRepository.create(createFrequencyDtos);
    return this.frequencyRepository.save(frequencies);
  }

  async findAll(): Promise<Frequency[]> {
    return this.frequencyRepository.find();
  }

  async findLatest(): Promise<Frequency> {
    return this.frequencyRepository.findOne({
      order: { anoSessao: 'DESC', numeroSessao: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Frequency> {
    const frequency = await this.frequencyRepository.findOneBy({ id });
    if (!frequency) {
      throw new NotFoundException(`Frequency with ID ${id} not found`);
    }
    return frequency;
  }

  async update(
    id: number,
    updateFrequencyDto: UpdateFrequencyDto,
  ): Promise<Frequency> {
    await this.frequencyRepository.update(id, updateFrequencyDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.frequencyRepository.delete(id);
  }
}

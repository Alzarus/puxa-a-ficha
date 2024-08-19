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

  create(createFrequencyDto: CreateFrequencyDto): Promise<Frequency> {
    const frequency = this.frequencyRepository.create(createFrequencyDto);
    return this.frequencyRepository.save(frequency);
  }

  findAll(): Promise<Frequency[]> {
    return this.frequencyRepository.find();
  }

  async findOne(id: number): Promise<Frequency> {
    const frequency = await this.frequencyRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!frequency) {
      throw new NotFoundException(`Frequency with ID ${id} not found`);
    }

    return frequency;
  }

  async update(
    id: number,
    updateFrequencyDto: UpdateFrequencyDto,
  ): Promise<Frequency> {
    await this.findOne(id); // Check if the entity exists
    await this.frequencyRepository.update(id, updateFrequencyDto);
    return this.findOne(id); // Return the updated entity
  }

  async remove(id: number): Promise<void> {
    const result = await this.frequencyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Frequency with ID ${id} not found`);
    }
  }
}

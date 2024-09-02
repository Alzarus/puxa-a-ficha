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
    const frequency = this.frequencyRepository.create({
      numeroSessao: createFrequencyDto.pre_ses_numero,
      anoSessao: createFrequencyDto.pre_ses_ano,
      nomeVereador: createFrequencyDto.cad_cad_nome_abreviado,
      statusPresenca: createFrequencyDto.pre_pre_presente,
    });
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
    const frequency = {
      numeroSessao: updateFrequencyDto.pre_ses_numero,
      anoSessao: updateFrequencyDto.pre_ses_ano,
      nomeVereador: updateFrequencyDto.cad_cad_nome_abreviado,
      statusPresenca: updateFrequencyDto.pre_pre_presente,
    };
    await this.findOne(id); // Check if the entity exists

    await this.frequencyRepository.update(id, frequency);
    return this.findOne(id); // Return the updated entity
  }

  async remove(id: number): Promise<void> {
    const result = await this.frequencyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Frequency with ID ${id} not found`);
    }
  }

  async findLatest(): Promise<Frequency> {
    return this.frequencyRepository.findOne({
      order: {
        anoSessao: 'DESC',
        numeroSessao: 'DESC',
      },
    });
  }
}

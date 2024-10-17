import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Councilor } from './entities/councilor.entity';
import { CreateCouncilorDto } from './dto/create-councilor.dto';
import { UpdateCouncilorDto } from './dto/update-councilor.dto';

@Injectable()
export class CouncilorService {
  constructor(
    @InjectRepository(Councilor)
    private readonly councilorRepository: Repository<Councilor>,
  ) {}

  async create(createCouncilorDto: CreateCouncilorDto): Promise<Councilor> {
    const {
      extras: { nascimento, telefone, email, endereço_de_gabinete },
      ...rest
    } = createCouncilorDto;
    const councilor = this.councilorRepository.create({
      ...rest,
      nascimento,
      telefone,
      email,
      enderecoDeGabinete: endereço_de_gabinete,
    });
    return this.councilorRepository.save(councilor);
  }

  async createMany(
    createCouncilorDtos: CreateCouncilorDto[],
  ): Promise<Councilor[]> {
    const councilors = createCouncilorDtos.map((dto) => {
      const {
        extras: { nascimento, telefone, email, endereço_de_gabinete },
        ...rest
      } = dto;
      return this.councilorRepository.create({
        ...rest,
        nascimento,
        telefone,
        email,
        enderecoDeGabinete: endereço_de_gabinete,
      });
    });
    return this.councilorRepository.save(councilors);
  }

  findAll(): Promise<Councilor[]> {
    return this.councilorRepository.find();
  }

  async findOne(id: number): Promise<Councilor> {
    const councilor = await this.councilorRepository.findOneBy({ id });
    if (!councilor) {
      throw new NotFoundException(`Councilor with ID ${id} not found`);
    }
    return councilor;
  }

  async update(
    id: number,
    updateCouncilorDto: UpdateCouncilorDto,
  ): Promise<Councilor> {
    const {
      extras: { nascimento, telefone, email, endereço_de_gabinete },
      ...rest
    } = updateCouncilorDto;

    await this.councilorRepository.update(id, {
      ...rest,
      nascimento,
      telefone,
      email,
      enderecoDeGabinete: endereço_de_gabinete,
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.councilorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Councilor with ID ${id} not found`);
    }
  }
}

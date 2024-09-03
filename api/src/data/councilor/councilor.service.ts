import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateCouncilorDto } from './dto/create-councilor.dto';
import { UpdateCouncilorDto } from './dto/update-councilor.dto';
import { Councilor } from './entities/councilor.entity';

@Injectable()
export class CouncilorService {
  constructor(
    @InjectRepository(Councilor)
    private readonly councilorRepository: Repository<Councilor>,
  ) {}

  async create(createCouncilorDto: CreateCouncilorDto): Promise<Councilor> {
    const {
      nascimento,
      telefone,
      'e-mail': email,
      endereço_de_gabinete: enderecoDeGabinete,
      ...rest
    } = createCouncilorDto;

    const councilor = this.councilorRepository.create({
      ...rest,
      nascimento,
      telefone,
      email,
      enderecoDeGabinete,
    });

    return this.councilorRepository.save(councilor);
  }

  async findAll(): Promise<Councilor[]> {
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
      nascimento,
      telefone,
      'e-mail': email,
      endereço_de_gabinete: enderecoDeGabinete,
      ...rest
    } = updateCouncilorDto;

    await this.councilorRepository.update(id, {
      ...rest,
      nascimento,
      telefone,
      email,
      enderecoDeGabinete,
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.councilorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Councilor with ID ${id} not found`);
    }
  }

  async findByName(nome: string): Promise<Councilor[]> {
    return this.councilorRepository.find({
      where: {
        nome: Like(`%${nome}%`),
      },
    });
  }
}

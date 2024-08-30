import { Injectable } from '@nestjs/common';
import { CreateCouncilorDto } from './dto/create-councilor.dto';
import { UpdateCouncilorDto } from './dto/update-councilor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Councilor } from './entities/councilor.entity';

@Injectable()
export class CouncilorService {
  constructor(
    @InjectRepository(Councilor)
    private councilorRepository: Repository<Councilor>,
  ) {}

  async create(createCouncilorDto: CreateCouncilorDto): Promise<Councilor> {
    const councilor = this.councilorRepository.create(createCouncilorDto);
    // nome: string;
    // partido: string;
    // descricao: string;
    // linkFoto: string;
    // emAtividade: boolean;
    // nascimento: string;
    // telefone: string;
    // email: string;
    // enderecoDeGabinete: string;
    // const councilor = this.councilorRepository.create({
    //   nome: createCouncilorDto.nome,
    //   partido: createCouncilorDto.partido,
    //   descricao: createCouncilorDto.descricao,
    //   linkFoto: createCouncilorDto.linkFoto,
    //   emAtividade: createCouncilorDto.emAtividade,
    //   nascimento: createCouncilorDto.nascimento
    // });
    return this.councilorRepository.save(councilor);
  }

  async findAll(): Promise<Councilor[]> {
    return this.councilorRepository.find();
  }

  async findOne(id: number): Promise<Councilor> {
    return this.councilorRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByName(nome: string): Promise<Councilor[]> {
    return this.councilorRepository.find({
      where: { nome: nome },
    });
  }

  async update(
    id: number,
    updateCouncilorDto: UpdateCouncilorDto,
  ): Promise<Councilor> {
    await this.councilorRepository.update(id, updateCouncilorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.councilorRepository.delete(id);
  }
}

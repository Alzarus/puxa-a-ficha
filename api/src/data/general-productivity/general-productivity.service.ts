import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralProductivity } from './entities/general-productivity.entity';
import { CreateGeneralProductivityDto } from './dto/create-general-productivity.dto';
import { UpdateGeneralProductivityDto } from './dto/update-general-productivity.dto';

@Injectable()
export class GeneralProductivityService {
  constructor(
    @InjectRepository(GeneralProductivity)
    private readonly generalProductivityRepository: Repository<GeneralProductivity>,
  ) {}

  async create(
    createGeneralProductivityDto: CreateGeneralProductivityDto,
  ): Promise<GeneralProductivity> {
    const generalProductivity = this.generalProductivityRepository.create({
      ano: createGeneralProductivityDto['Ano'],
      parlamentarAutor: createGeneralProductivityDto['Parlamentar/Autor'],
      emenda: createGeneralProductivityDto['Emenda'],
      mensagem: createGeneralProductivityDto['Mensagem'],
      parecer: createGeneralProductivityDto['Parecer'],
      relatoria: createGeneralProductivityDto['Relatoria'],
      substitutivo: createGeneralProductivityDto['Substitutivo'],
      vistas: createGeneralProductivityDto['Vistas'],
      votoRelator: createGeneralProductivityDto['Voto do Relator'],
      votoSeparado: createGeneralProductivityDto['Voto em Separado'],
      total: createGeneralProductivityDto['Total'],
      tipo: createGeneralProductivityDto['Tipo'],
    });
    return this.generalProductivityRepository.save(generalProductivity);
  }

  async createMany(
    createGeneralProductivityDtos: CreateGeneralProductivityDto[],
  ): Promise<GeneralProductivity[]> {
    const generalProductivities = createGeneralProductivityDtos.map((dto) => {
      return this.generalProductivityRepository.create({
        ano: dto['Ano'],
        parlamentarAutor: dto['Parlamentar/Autor'],
        emenda: dto['Emenda'],
        mensagem: dto['Mensagem'],
        parecer: dto['Parecer'],
        relatoria: dto['Relatoria'],
        substitutivo: dto['Substitutivo'],
        vistas: dto['Vistas'],
        votoRelator: dto['Voto do Relator'],
        votoSeparado: dto['Voto em Separado'],
        total: dto['Total'],
        tipo: dto['Tipo'],
      });
    });
    return this.generalProductivityRepository.save(generalProductivities);
  }

  async findAll(): Promise<GeneralProductivity[]> {
    return this.generalProductivityRepository.find();
  }

  async findLatest(): Promise<GeneralProductivity> {
    const generalProductivity =
      await this.generalProductivityRepository.findOne({
        order: { ano: 'DESC' },
      });

    if (!generalProductivity) {
      throw new NotFoundException('No latest general productivity found');
    }

    return generalProductivity;
  }

  async findOne(id: number): Promise<GeneralProductivity> {
    const generalProductivity =
      await this.generalProductivityRepository.findOneBy({ id });
    if (!generalProductivity) {
      throw new NotFoundException(
        `GeneralProductivity with ID ${id} not found`,
      );
    }
    return generalProductivity;
  }

  async update(
    id: number,
    updateGeneralProductivityDto: UpdateGeneralProductivityDto,
  ): Promise<GeneralProductivity> {
    const updatedData = {
      ano: updateGeneralProductivityDto['Ano'],
      parlamentarAutor: updateGeneralProductivityDto['Parlamentar/Autor'],
      emenda: updateGeneralProductivityDto['Emenda'],
      mensagem: updateGeneralProductivityDto['Mensagem'],
      parecer: updateGeneralProductivityDto['Parecer'],
      relatoria: updateGeneralProductivityDto['Relatoria'],
      substitutivo: updateGeneralProductivityDto['Substitutivo'],
      vistas: updateGeneralProductivityDto['Vistas'],
      votoRelator: updateGeneralProductivityDto['Voto do Relator'],
      votoSeparado: updateGeneralProductivityDto['Voto em Separado'],
      total: updateGeneralProductivityDto['Total'],
      tipo: updateGeneralProductivityDto['Tipo'],
    };

    await this.generalProductivityRepository.update(id, updatedData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.generalProductivityRepository.delete(id);
  }
}

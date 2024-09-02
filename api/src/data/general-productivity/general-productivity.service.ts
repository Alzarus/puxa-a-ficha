import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneralProductivityDto } from './dto/create-general-productivity.dto';
import { UpdateGeneralProductivityDto } from './dto/update-general-productivity.dto';
import { GeneralProductivity } from './entities/general-productivity.entity';

@Injectable()
export class GeneralProductivityService {
  constructor(
    @InjectRepository(GeneralProductivity)
    private generalProductivityRepository: Repository<GeneralProductivity>,
  ) {}

  create(createGeneralProductivityDto: CreateGeneralProductivityDto) {
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

  findAll() {
    return this.generalProductivityRepository.find();
  }

  findOne(id: number) {
    return this.generalProductivityRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateGeneralProductivityDto: UpdateGeneralProductivityDto,
  ) {
    const generalProductivity = this.generalProductivityRepository.create({
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
    });

    return this.generalProductivityRepository.update(id, generalProductivity);
  }

  remove(id: number) {
    return this.generalProductivityRepository.delete(id);
  }
}

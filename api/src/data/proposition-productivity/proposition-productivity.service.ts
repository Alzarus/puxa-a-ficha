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
      this.propositionProductivityRepository.create({
        ano: createPropositionProductivityDto['Ano'],
        parlamentarAutor: createPropositionProductivityDto['Parlamentar/Autor'],
        mocao: createPropositionProductivityDto['MOC'],
        projetoDecretoLegislativo: createPropositionProductivityDto['PDL'],
        projetoEmendaLOM: createPropositionProductivityDto['PEL'],
        projetoIndicacao: createPropositionProductivityDto['PIN'],
        projetoLeiComplementar: createPropositionProductivityDto['PLC'],
        projetoLei: createPropositionProductivityDto['PLE'],
        projetoResolucao: createPropositionProductivityDto['PRE'],
        requerimentoAdministrativo: createPropositionProductivityDto['RAD'],
        requerimentoUrgenciaUrgentissima:
          createPropositionProductivityDto['RUU'],
        requerimentoUtilidadePublica: createPropositionProductivityDto['RUP'],
        requerimentoEspecial: createPropositionProductivityDto['REP'],
        veto: createPropositionProductivityDto['VTO'],
        total: createPropositionProductivityDto['Total'],
        tipo: createPropositionProductivityDto['Tipo'],
      });
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
    const propositionProductivity =
      this.propositionProductivityRepository.create({
        ano: updatePropositionProductivityDto['Ano'],
        parlamentarAutor: updatePropositionProductivityDto['Parlamentar/Autor'],
        mocao: updatePropositionProductivityDto['MOC'],
        projetoDecretoLegislativo: updatePropositionProductivityDto['PDL'],
        projetoEmendaLOM: updatePropositionProductivityDto['PEL'],
        projetoIndicacao: updatePropositionProductivityDto['PIN'],
        projetoLeiComplementar: updatePropositionProductivityDto['PLC'],
        projetoLei: updatePropositionProductivityDto['PLE'],
        projetoResolucao: updatePropositionProductivityDto['PRE'],
        requerimentoAdministrativo: updatePropositionProductivityDto['RAD'],
        requerimentoUrgenciaUrgentissima:
          updatePropositionProductivityDto['RUU'],
        requerimentoUtilidadePublica: updatePropositionProductivityDto['RUP'],
        requerimentoEspecial: updatePropositionProductivityDto['REP'],
        veto: updatePropositionProductivityDto['VTO'],
        total: updatePropositionProductivityDto['Total'],
        tipo: updatePropositionProductivityDto['Tipo'],
      });

    await this.propositionProductivityRepository.update(
      id,
      propositionProductivity,
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

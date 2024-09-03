import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropositionDto } from './dto/create-proposition.dto';
import { UpdatePropositionDto } from './dto/update-proposition.dto';
import { Proposition } from './entities/proposition.entity';

@Injectable()
export class PropositionService {
  constructor(
    @InjectRepository(Proposition)
    private propositionRepository: Repository<Proposition>,
  ) {}

  create(createPropositionDto: CreatePropositionDto): Promise<Proposition> {
    const proposition = this.propositionRepository.create({
      proposicao: createPropositionDto.proposicao,
      autorProposicao: createPropositionDto.autorproposicao,
      ementa: createPropositionDto.pro_ementa,
      dataMovimentacao: createPropositionDto.tra_dt_movimentacao,
      destino: createPropositionDto.destino,
      situacaoFutura: createPropositionDto.sit_nome_futuro,
      autorDocumento: createPropositionDto.autordoc,
    });
    return this.propositionRepository.save(proposition);
  }

  findAll(): Promise<Proposition[]> {
    return this.propositionRepository.find();
  }

  findOne(id: number): Promise<Proposition> {
    return this.propositionRepository.findOne({
      where: { id },
    });
  }

  async findLatest(): Promise<Proposition> {
    return this.propositionRepository.findOne({
      order: { dataMovimentacao: 'DESC' },
    });
  }

  async update(
    id: number,
    updatePropositionDto: UpdatePropositionDto,
  ): Promise<Proposition> {
    const proposition = this.propositionRepository.create({
      proposicao: updatePropositionDto.proposicao,
      autorProposicao: updatePropositionDto.autorproposicao,
      ementa: updatePropositionDto.pro_ementa,
      dataMovimentacao: updatePropositionDto.tra_dt_movimentacao,
      destino: updatePropositionDto.destino,
      situacaoFutura: updatePropositionDto.sit_nome_futuro,
      autorDocumento: updatePropositionDto.autordoc,
    });

    await this.propositionRepository.update(id, proposition);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.propositionRepository.delete(id);
  }
}

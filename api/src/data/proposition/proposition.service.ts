import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposition } from './entities/proposition.entity';
import { CreatePropositionDto } from './dto/create-proposition.dto';
import { UpdatePropositionDto } from './dto/update-proposition.dto';

@Injectable()
export class PropositionService {
  constructor(
    @InjectRepository(Proposition)
    private readonly propositionRepository: Repository<Proposition>,
  ) {}

  async create(
    createPropositionDto: CreatePropositionDto,
  ): Promise<Proposition> {
    const proposition = this.propositionRepository.create({
      proposicao: createPropositionDto.proposicao,
      autorProposicao: createPropositionDto.autorproposicao,
      ementa: createPropositionDto.pro_ementa,
      dataMovimentacao: new Date(createPropositionDto.tra_dt_movimentacao),
      destino: createPropositionDto.destino,
      situacaoFutura: createPropositionDto.sit_nome_futuro,
      autorDocumento: createPropositionDto.autordoc,
    });
    return this.propositionRepository.save(proposition);
  }

  async createMany(
    createPropositionDtos: CreatePropositionDto[],
  ): Promise<Proposition[]> {
    const propositions = createPropositionDtos.map((dto) =>
      this.propositionRepository.create({
        proposicao: dto.proposicao,
        autorProposicao: dto.autorproposicao,
        ementa: dto.pro_ementa,
        dataMovimentacao: new Date(dto.tra_dt_movimentacao),
        destino: dto.destino,
        situacaoFutura: dto.sit_nome_futuro,
        autorDocumento: dto.autordoc,
      }),
    );
    return this.propositionRepository.save(propositions);
  }

  async findAll(): Promise<Proposition[]> {
    return this.propositionRepository.find();
  }

  async findOne(id: number): Promise<Proposition> {
    return this.propositionRepository.findOneBy({ id });
  }

  async findLatest(): Promise<Proposition> {
    const proposition = await this.propositionRepository.findOne({
      order: { dataMovimentacao: 'DESC' },
    });

    if (!proposition) {
      throw new NotFoundException('No latest proposition found');
    }

    return proposition;
  }

  async update(
    id: number,
    updatePropositionDto: UpdatePropositionDto,
  ): Promise<Proposition> {
    const updatedProposition = {
      proposicao: updatePropositionDto.proposicao,
      autorProposicao: updatePropositionDto.autorproposicao,
      ementa: updatePropositionDto.pro_ementa,
      dataMovimentacao: new Date(updatePropositionDto.tra_dt_movimentacao),
      destino: updatePropositionDto.destino,
      situacaoFutura: updatePropositionDto.sit_nome_futuro,
      autorDocumento: updatePropositionDto.autordoc,
    };

    await this.propositionRepository.update(id, updatedProposition);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.propositionRepository.delete(id);
  }
}

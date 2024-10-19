import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const contract = this.contractRepository.create({
      numero_contrato: createContractDto.contrato,
      nome_contratado: createContractDto.cad_nome_completo,
      data_assinatura: createContractDto.con_dt_assinatura,
      data_inicio: createContractDto.con_dt_inicio,
      data_fim: createContractDto.con_dt_final,
      valor_contrato: createContractDto.con_valor,
      tempo_maximo_execucao: createContractDto.con_tempo_maximo,
      data_publicacao: createContractDto.con_dt_publicacao,
      diario_oficial: createContractDto.diario,
      link_pdf: createContractDto.pdf,
    });

    return this.contractRepository.save(contract);
  }

  async createMany(
    createContractDtos: CreateContractDto[],
  ): Promise<Contract[]> {
    const contracts = createContractDtos.map((dto) =>
      this.contractRepository.create({
        numero_contrato: dto.contrato,
        nome_contratado: dto.cad_nome_completo,
        data_assinatura: dto.con_dt_assinatura,
        data_inicio: dto.con_dt_inicio,
        data_fim: dto.con_dt_final,
        valor_contrato: dto.con_valor,
        tempo_maximo_execucao: dto.con_tempo_maximo,
        data_publicacao: dto.con_dt_publicacao,
        diario_oficial: dto.diario,
        link_pdf: dto.pdf,
      }),
    );
    return this.contractRepository.save(contracts);
  }

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find();
  }

  async update(
    id: number,
    updateContractDto: UpdateContractDto,
  ): Promise<Contract> {
    const updatedContract = {
      numero_contrato: updateContractDto.contrato,
      nome_contratado: updateContractDto.cad_nome_completo,
      data_assinatura: updateContractDto.con_dt_assinatura,
      data_inicio: updateContractDto.con_dt_inicio,
      data_fim: updateContractDto.con_dt_final,
      valor_contrato: updateContractDto.con_valor,
      tempo_maximo_execucao: updateContractDto.con_tempo_maximo,
      data_publicacao: updateContractDto.con_dt_publicacao,
      diario_oficial: updateContractDto.diario,
      link_pdf: updateContractDto.pdf,
    };

    await this.contractRepository.update(id, updatedContract);
    const findContract = await this.findOne(id);

    if (!findContract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    return findContract;
  }

  async updateMany(
    updateContractDtos: UpdateContractDto[],
  ): Promise<Contract[]> {
    const updatedContracts = [];
    for (const dto of updateContractDtos) {
      const updatedContract = {
        numero_contrato: dto.contrato,
        nome_contratado: dto.cad_nome_completo,
        data_assinatura: dto.con_dt_assinatura,
        data_inicio: dto.con_dt_inicio,
        data_fim: dto.con_dt_final,
        valor_contrato: dto.con_valor,
        tempo_maximo_execucao: dto.con_tempo_maximo,
        data_publicacao: dto.con_dt_publicacao,
        diario_oficial: dto.diario,
        link_pdf: dto.pdf,
      };

      await this.contractRepository.update(dto.id, updatedContract);
      const contract = await this.findOne(dto.id);
      updatedContracts.push(contract);
    }
    return updatedContracts;
  }

  async findOne(id: number): Promise<Contract | null> {
    const contract = await this.contractRepository.findOneBy({ id });
    return contract || null;
  }

  async remove(id: number): Promise<void> {
    await this.contractRepository.delete(id);
  }

  async findLatest(): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      order: { data_publicacao: 'DESC' },
    });

    if (!contract) {
      throw new NotFoundException('No latest contract found');
    }

    return contract;
  }
}

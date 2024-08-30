import { Injectable } from '@nestjs/common';
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

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find();
  }

  async findOne(id: number): Promise<Contract> {
    return this.contractRepository.findOneBy({ id });
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
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.contractRepository.delete(id);
  }

  async findLatest(): Promise<Contract> {
    return this.contractRepository.findOne({
      order: { data_publicacao: 'DESC' },
    });
  }
}

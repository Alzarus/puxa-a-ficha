import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const newContract = this.contractRepository.create(createContractDto);
    return await this.contractRepository.save(newContract);
  }

  async findAll(): Promise<Contract[]> {
    return await this.contractRepository.find();
  }

  async findOne(id: number): Promise<Contract> {
    return await this.contractRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateContractDto: UpdateContractDto,
  ): Promise<Contract> {
    await this.contractRepository.update(id, updateContractDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.contractRepository.delete(id);
  }
}

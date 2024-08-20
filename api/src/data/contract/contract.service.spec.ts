import { Test, TestingModule } from '@nestjs/testing';
import { ContractService } from './contract.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';

describe('ContractService', () => {
  let service: ContractService;
  let repository: Repository<Contract>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractService,
        {
          provide: getRepositoryToken(Contract),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ContractService>(ContractService);
    repository = module.get<Repository<Contract>>(getRepositoryToken(Contract));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

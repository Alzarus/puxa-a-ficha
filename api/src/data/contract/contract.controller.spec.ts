import { Test, TestingModule } from '@nestjs/testing';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { Repository } from 'typeorm';

describe('ContractController', () => {
  let controller: ContractController;
  let service: ContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractController],
      providers: [
        ContractService,
        {
          provide: getRepositoryToken(Contract),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ContractController>(ContractController);
    service = module.get<ContractService>(ContractService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

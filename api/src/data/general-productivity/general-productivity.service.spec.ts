import { Test, TestingModule } from '@nestjs/testing';
import { GeneralProductivityService } from './general-productivity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GeneralProductivity } from './entities/general-productivity.entity';
import { Repository } from 'typeorm';

describe('GeneralProductivityService', () => {
  let service: GeneralProductivityService;
  let repository: Repository<GeneralProductivity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneralProductivityService,
        {
          provide: getRepositoryToken(GeneralProductivity),
          useClass: Repository, // Mock o repositório
        },
      ],
    }).compile();

    service = module.get<GeneralProductivityService>(
      GeneralProductivityService,
    );
    repository = module.get<Repository<GeneralProductivity>>(
      getRepositoryToken(GeneralProductivity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

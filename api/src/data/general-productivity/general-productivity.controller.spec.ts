import { Test, TestingModule } from '@nestjs/testing';
import { GeneralProductivityController } from './general-productivity.controller';
import { GeneralProductivityService } from './general-productivity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GeneralProductivity } from './entities/general-productivity.entity';
import { Repository } from 'typeorm';

describe('GeneralProductivityController', () => {
  let controller: GeneralProductivityController;
  let service: GeneralProductivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralProductivityController],
      providers: [
        GeneralProductivityService,
        {
          provide: getRepositoryToken(GeneralProductivity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<GeneralProductivityController>(
      GeneralProductivityController,
    );
    service = module.get<GeneralProductivityService>(
      GeneralProductivityService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

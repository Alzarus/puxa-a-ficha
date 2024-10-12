import { Test, TestingModule } from '@nestjs/testing';
import { CouncilorController } from './councilor.controller';
import { CouncilorService } from './councilor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Councilor } from './entities/councilor.entity';
import { Repository } from 'typeorm';

describe('CouncilorController', () => {
  let controller: CouncilorController;
  let service: CouncilorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouncilorController],
      providers: [
        CouncilorService,
        {
          provide: getRepositoryToken(Councilor),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CouncilorController>(CouncilorController);
    service = module.get<CouncilorService>(CouncilorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CouncilorController } from './councilor.controller';
import { CouncilorService } from './councilor.service';

describe('CouncilorController', () => {
  let controller: CouncilorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouncilorController],
      providers: [CouncilorService],
    }).compile();

    controller = module.get<CouncilorController>(CouncilorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

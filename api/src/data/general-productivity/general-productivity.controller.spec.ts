import { Test, TestingModule } from '@nestjs/testing';
import { GeneralProductivityController } from './general-productivity.controller';
import { GeneralProductivityService } from './general-productivity.service';

describe('GeneralProductivityController', () => {
  let controller: GeneralProductivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralProductivityController],
      providers: [GeneralProductivityService],
    }).compile();

    controller = module.get<GeneralProductivityController>(GeneralProductivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

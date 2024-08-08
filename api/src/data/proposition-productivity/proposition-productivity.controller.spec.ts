import { Test, TestingModule } from '@nestjs/testing';
import { PropositionProductivityController } from './proposition-productivity.controller';
import { PropositionProductivityService } from './proposition-productivity.service';

describe('PropositionProductivityController', () => {
  let controller: PropositionProductivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropositionProductivityController],
      providers: [PropositionProductivityService],
    }).compile();

    controller = module.get<PropositionProductivityController>(PropositionProductivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

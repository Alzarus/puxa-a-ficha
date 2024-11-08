import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionStatusController } from './execution-status.controller';
import { ExecutionStatusService } from './execution-status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExecutionStatus } from './entities/execution-status.entity';

describe('ExecutionStatusController', () => {
  let controller: ExecutionStatusController;
  let service: ExecutionStatusService;

  const mockExecutionStatusService = {
    shouldExecute: jest.fn(),
    logExecution: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecutionStatusController],
      providers: [
        {
          provide: ExecutionStatusService,
          useValue: mockExecutionStatusService,
        },
        {
          provide: getRepositoryToken(ExecutionStatus),
          useValue: {}, // Aqui você pode adicionar mocks para o repositório se necessário
        },
      ],
    }).compile();

    controller = module.get<ExecutionStatusController>(
      ExecutionStatusController,
    );
    service = module.get<ExecutionStatusService>(ExecutionStatusService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

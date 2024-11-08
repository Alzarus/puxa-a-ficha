import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionStatusService } from './execution-status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExecutionStatus } from './entities/execution-status.entity';
import { Repository } from 'typeorm';

describe('ExecutionStatusService', () => {
  let service: ExecutionStatusService;
  let repository: Repository<ExecutionStatus>;

  const mockExecutionStatusRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExecutionStatusService,
        {
          provide: getRepositoryToken(ExecutionStatus),
          useValue: mockExecutionStatusRepository,
        },
      ],
    }).compile();

    service = module.get<ExecutionStatusService>(ExecutionStatusService);
    repository = module.get<Repository<ExecutionStatus>>(
      getRepositoryToken(ExecutionStatus),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('shouldExecute', () => {
    it('should return true if there is no previous execution', async () => {
      mockExecutionStatusRepository.findOne.mockResolvedValue(null);
      const result = await service.shouldExecute('COMPLETED');
      expect(result).toBe(true);
    });

    it('should return true if the last execution was on a different day', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1); // Um dia antes
      mockExecutionStatusRepository.findOne.mockResolvedValue({
        status: 'COMPLETED',
        executedAt: yesterday.toISOString(), // Utilize toISOString para garantir formato correto
      });
      const result = await service.shouldExecute('COMPLETED');
      expect(result).toBe(true);
    });

    it('should return false if the last execution was today', async () => {
      const today = new Date(); // Hoje
      mockExecutionStatusRepository.findOne.mockResolvedValue({
        status: 'COMPLETED',
        executedAt: today.toISOString(), // Utilize toISOString para garantir formato correto
      });
      const result = await service.shouldExecute('COMPLETED');
      expect(result).toBe(false);
    });
  });
});

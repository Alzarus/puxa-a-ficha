import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HealthCheckService } from '@nestjs/terminus';
import { TypeOrmHealthIndicator } from '@nestjs/terminus'; // Importando o TypeOrmHealthIndicator

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  const mockHealthCheckService = {
    check: jest.fn().mockResolvedValue({ status: 'ok' }),
  };

  const mockTypeOrmHealthIndicator = {
    pingCheck: jest.fn().mockResolvedValue({ status: 'ok' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthService,
        {
          provide: HealthCheckService,
          useValue: mockHealthCheckService,
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: mockTypeOrmHealthIndicator, // Mock do TypeOrmHealthIndicator
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

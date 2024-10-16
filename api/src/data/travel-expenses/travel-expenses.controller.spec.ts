import { Test, TestingModule } from '@nestjs/testing';
import { TravelExpensesController } from './travel-expenses.controller';
import { TravelExpensesService } from './travel-expenses.service';
import { CreateTravelExpenseDto } from './dto/create-travel-expense.dto';
import { TravelExpense } from './entities/travel-expense.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TravelExpensesController', () => {
  let controller: TravelExpensesController;
  let service: TravelExpensesService;

  const mockService = {
    create: jest.fn((dto: CreateTravelExpenseDto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id: number) => ({
      id,
      data: new Date(),
      tipo: 'Diária',
      usuario: 'Test User',
      valor: 100,
      localidade: 'Test City',
      justificativa: 'Test Justification',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelExpensesController],
      providers: [
        TravelExpensesService,
        {
          provide: getRepositoryToken(TravelExpense),
          useClass: Repository,
        },
      ],
    })
      .overrideProvider(TravelExpensesService)
      .useValue(mockService)
      .compile();

    controller = module.get<TravelExpensesController>(TravelExpensesController);
    service = module.get<TravelExpensesService>(TravelExpensesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a travel expense', async () => {
    const dto: CreateTravelExpenseDto = {
      data: '2024-04-19',
      tipo: 'Diária',
      usuario: 'Test User',
      valor: 100.0,
      localidade: 'Test City',
      justificativa: 'Test Justification',
    };

    const result = await controller.create(dto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all travel expenses', async () => {
    expect(await controller.findAll()).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single travel expense', async () => {
    const id = 1;
    const result = await controller.findOne(id);
    expect(result).toEqual({
      id,
      data: expect.any(Date),
      tipo: 'Diária',
      usuario: 'Test User',
      valor: 100,
      localidade: 'Test City',
      justificativa: 'Test Justification',
    });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });
});

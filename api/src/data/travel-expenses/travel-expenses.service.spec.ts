import { Test, TestingModule } from '@nestjs/testing';
import { TravelExpensesService } from './travel-expenses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TravelExpense } from './entities/travel-expense.entity';
import { Repository } from 'typeorm';

describe('TravelExpensesService', () => {
  let service: TravelExpensesService;
  let repository: Repository<TravelExpense>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelExpensesService,
        {
          provide: getRepositoryToken(TravelExpense),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TravelExpensesService>(TravelExpensesService);
    repository = module.get<Repository<TravelExpense>>(
      getRepositoryToken(TravelExpense),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all travel expenses', async () => {
    mockRepository.find.mockResolvedValue([]);
    expect(await service.findAll()).toEqual([]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should return a single travel expense', async () => {
    const id = 1;
    const entity = {
      id,
      data: '2024-04-19',
      tipo: 'Diária',
      usuario: 'Test User',
      valor: 100,
      localidade: 'Test City',
      justificativa: 'Test Justification',
    };

    mockRepository.findOne.mockResolvedValue(entity);
    expect(await service.findOne(id)).toEqual(entity);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TravelExpensesService } from './travel-expenses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TravelExpense } from './entities/travel-expense.entity';
import { Repository } from 'typeorm';

describe('TravelExpensesService', () => {
  let service: TravelExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelExpensesService,
        {
          provide: getRepositoryToken(TravelExpense),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TravelExpensesService>(TravelExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

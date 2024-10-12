import { Test, TestingModule } from '@nestjs/testing';
import { TravelExpensesController } from './travel-expenses.controller';
import { TravelExpensesService } from './travel-expenses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TravelExpense } from './entities/travel-expense.entity';
import { Repository } from 'typeorm';

describe('TravelExpensesController', () => {
  let controller: TravelExpensesController;

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
    }).compile();

    controller = module.get<TravelExpensesController>(TravelExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

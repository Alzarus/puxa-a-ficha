import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelExpensesService } from './travel-expenses.service';
import { TravelExpensesController } from './travel-expenses.controller';
import { TravelExpense } from './entities/travel-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TravelExpense])],
  controllers: [TravelExpensesController],
  providers: [TravelExpensesService],
})
export class TravelExpensesModule {}

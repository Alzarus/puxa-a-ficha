import { Module } from '@nestjs/common';
import { TravelExpensesService } from './travel-expenses.service';
import { TravelExpensesController } from './travel-expenses.controller';

@Module({
  controllers: [TravelExpensesController],
  providers: [TravelExpensesService],
})
export class TravelExpensesModule {}

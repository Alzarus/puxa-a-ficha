import { Injectable } from '@nestjs/common';
import { CreateTravelExpenseDto } from './dto/create-travel-expense.dto';
import { UpdateTravelExpenseDto } from './dto/update-travel-expense.dto';

@Injectable()
export class TravelExpensesService {
  create(createTravelExpenseDto: CreateTravelExpenseDto) {
    return 'This action adds a new travelExpense';
  }

  findAll() {
    return `This action returns all travelExpenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travelExpense`;
  }

  update(id: number, updateTravelExpenseDto: UpdateTravelExpenseDto) {
    return `This action updates a #${id} travelExpense`;
  }

  remove(id: number) {
    return `This action removes a #${id} travelExpense`;
  }
}

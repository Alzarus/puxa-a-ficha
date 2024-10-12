import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TravelExpensesService } from './travel-expenses.service';
import { CreateTravelExpenseDto } from './dto/create-travel-expense.dto';
import { UpdateTravelExpenseDto } from './dto/update-travel-expense.dto';
import { TravelExpense } from './entities/travel-expense.entity';

@Controller('travel-expenses')
export class TravelExpensesController {
  constructor(private readonly travelExpensesService: TravelExpensesService) {}

  @Post()
  async create(
    @Body()
    createTravelExpenseDto: CreateTravelExpenseDto | CreateTravelExpenseDto[],
  ) {
    if (Array.isArray(createTravelExpenseDto)) {
      return this.travelExpensesService.createMany(createTravelExpenseDto);
    } else {
      return this.travelExpensesService.create(createTravelExpenseDto);
    }
  }

  @Get()
  findAll() {
    return this.travelExpensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelExpensesService.findOne(+id);
  }

  @Get('latest')
  findLatest(): Promise<TravelExpense> {
    return this.travelExpensesService.findLatest();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTravelExpenseDto: UpdateTravelExpenseDto,
  ) {
    return this.travelExpensesService.update(+id, updateTravelExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelExpensesService.remove(+id);
  }
}

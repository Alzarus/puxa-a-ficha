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

@Controller('travel-expenses')
export class TravelExpensesController {
  constructor(private readonly travelExpensesService: TravelExpensesService) {}

  @Post()
  create(@Body() createTravelExpenseDto: CreateTravelExpenseDto) {
    return this.travelExpensesService.create(createTravelExpenseDto);
  }

  @Get()
  findAll() {
    return this.travelExpensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelExpensesService.findOne(+id);
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

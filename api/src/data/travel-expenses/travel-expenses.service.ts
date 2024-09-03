import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTravelExpenseDto } from './dto/create-travel-expense.dto';
import { UpdateTravelExpenseDto } from './dto/update-travel-expense.dto';
import { TravelExpense } from './entities/travel-expense.entity';

@Injectable()
export class TravelExpensesService {
  constructor(
    @InjectRepository(TravelExpense)
    private readonly travelExpensesRepository: Repository<TravelExpense>,
  ) {}

  async create(
    createTravelExpenseDto: CreateTravelExpenseDto,
  ): Promise<TravelExpense> {
    const travelExpense = this.travelExpensesRepository.create({
      ...createTravelExpenseDto,
      data: new Date(
        createTravelExpenseDto.data.split('/').reverse().join('-'),
      ),
    });
    return this.travelExpensesRepository.save(travelExpense);
  }

  async findAll(): Promise<TravelExpense[]> {
    return this.travelExpensesRepository.find();
  }

  async findLatest(): Promise<TravelExpense> {
    return this.travelExpensesRepository.findOne({
      order: { data: 'DESC' },
    });
  }

  async findOne(id: number): Promise<TravelExpense> {
    const travelExpense = await this.travelExpensesRepository.findOneBy({ id });
    if (!travelExpense) {
      throw new NotFoundException(`TravelExpense with ID ${id} not found`);
    }
    return travelExpense;
  }

  async update(
    id: number,
    updateTravelExpenseDto: UpdateTravelExpenseDto,
  ): Promise<TravelExpense> {
    const updatedData = {
      ...updateTravelExpenseDto,
      data: new Date(
        updateTravelExpenseDto.data.split('/').reverse().join('-'),
      ),
    };

    await this.travelExpensesRepository.update(id, updatedData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.travelExpensesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TravelExpense with ID ${id} not found`);
    }
  }
}

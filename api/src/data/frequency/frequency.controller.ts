import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FrequencyService } from './frequency.service';
import { CreateFrequencyDto } from './dto/create-frequency.dto';
import { UpdateFrequencyDto } from './dto/update-frequency.dto';
import { Frequency } from './entities/frequency.entity';

@Controller('frequency')
export class FrequencyController {
  constructor(private readonly frequencyService: FrequencyService) {}

  @Post()
  create(@Body() createFrequencyDto: CreateFrequencyDto): Promise<Frequency> {
    return this.frequencyService.create(createFrequencyDto);
  }

  @Get()
  findAll(): Promise<Frequency[]> {
    return this.frequencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Frequency> {
    return this.frequencyService.findOne(id);
  }

  @Get('latest')
  async findLatest(): Promise<Frequency> {
    return this.frequencyService.findLatest();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFrequencyDto: UpdateFrequencyDto,
  ): Promise<Frequency> {
    return this.frequencyService.update(id, updateFrequencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.frequencyService.remove(id);
  }
}

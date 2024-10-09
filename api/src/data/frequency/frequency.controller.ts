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

@Controller('frequencies')
export class FrequencyController {
  constructor(private readonly frequencyService: FrequencyService) {}

  @Post()
  async create(@Body() data: CreateFrequencyDto | CreateFrequencyDto[]) {
    if (Array.isArray(data)) {
      return this.frequencyService.createMany(data);
    } else {
      return this.frequencyService.create(data);
    }
  }

  @Get()
  findAll() {
    return this.frequencyService.findAll();
  }

  @Get('latest')
  findLatest() {
    return this.frequencyService.findLatest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frequencyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFrequencyDto: UpdateFrequencyDto,
  ) {
    return this.frequencyService.update(+id, updateFrequencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frequencyService.remove(+id);
  }
}

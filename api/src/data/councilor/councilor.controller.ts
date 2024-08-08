import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouncilorService } from './councilor.service';
import { CreateCouncilorDto } from './dto/create-councilor.dto';
import { UpdateCouncilorDto } from './dto/update-councilor.dto';

@Controller('councilor')
export class CouncilorController {
  constructor(private readonly councilorService: CouncilorService) {}

  @Post()
  create(@Body() createCouncilorDto: CreateCouncilorDto) {
    return this.councilorService.create(createCouncilorDto);
  }

  @Get()
  findAll() {
    return this.councilorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.councilorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouncilorDto: UpdateCouncilorDto) {
    return this.councilorService.update(+id, updateCouncilorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.councilorService.remove(+id);
  }
}

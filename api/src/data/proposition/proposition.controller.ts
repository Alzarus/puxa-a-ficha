import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropositionService } from './proposition.service';
import { CreatePropositionDto } from './dto/create-proposition.dto';
import { UpdatePropositionDto } from './dto/update-proposition.dto';
import { Proposition } from './entities/proposition.entity';

@Controller('propositions')
export class PropositionController {
  constructor(private readonly propositionService: PropositionService) {}

  @Post()
  create(@Body() createPropositionDto: CreatePropositionDto) {
    return this.propositionService.create(createPropositionDto);
  }

  @Get()
  findAll() {
    return this.propositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propositionService.findOne(+id);
  }

  @Get('latest')
  async findLatest(): Promise<Proposition> {
    return this.propositionService.findLatest();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropositionDto: UpdatePropositionDto,
  ) {
    return this.propositionService.update(+id, updatePropositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propositionService.remove(+id);
  }
}

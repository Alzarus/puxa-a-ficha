import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropositionProductivityService } from './proposition-productivity.service';
import { CreatePropositionProductivityDto } from './dto/create-proposition-productivity.dto';
import { UpdatePropositionProductivityDto } from './dto/update-proposition-productivity.dto';
import { PropositionProductivity } from './entities/proposition-productivity.entity';

@Controller('proposition-productivity')
export class PropositionProductivityController {
  constructor(
    private readonly propositionProductivityService: PropositionProductivityService,
  ) {}

  @Post()
  async create(
    @Body()
    createPropositionProductivityDto:
      | CreatePropositionProductivityDto
      | CreatePropositionProductivityDto[],
  ) {
    if (Array.isArray(createPropositionProductivityDto)) {
      return this.propositionProductivityService.createMany(
        createPropositionProductivityDto,
      );
    } else {
      return this.propositionProductivityService.create(
        createPropositionProductivityDto,
      );
    }
  }

  @Get()
  findAll() {
    return this.propositionProductivityService.findAll();
  }

  @Get('latest')
  async findLatest(): Promise<PropositionProductivity> {
    return this.propositionProductivityService.findLatest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propositionProductivityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropositionProductivityDto: UpdatePropositionProductivityDto,
  ) {
    return this.propositionProductivityService.update(
      +id,
      updatePropositionProductivityDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propositionProductivityService.remove(+id);
  }
}

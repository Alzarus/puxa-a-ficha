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

@Controller('proposition-productivity')
export class PropositionProductivityController {
  constructor(
    private readonly propositionProductivityService: PropositionProductivityService,
  ) {}

  @Post()
  create(
    @Body() createPropositionProductivityDto: CreatePropositionProductivityDto,
  ) {
    return this.propositionProductivityService.create(
      createPropositionProductivityDto,
    );
  }

  @Get()
  findAll() {
    return this.propositionProductivityService.findAll();
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

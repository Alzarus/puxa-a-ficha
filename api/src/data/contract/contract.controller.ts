import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  async create(
    @Body() createContractDto: CreateContractDto | CreateContractDto[],
  ) {
    if (Array.isArray(createContractDto)) {
      return this.contractService.createMany(createContractDto);
    }
    return this.contractService.create(createContractDto);
  }

  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contractService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractService.update(id, updateContractDto);
  }

  @Patch()
  async updateMany(@Body() updateContractDto: UpdateContractDto[]) {
    return this.contractService.updateMany(updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contractService.remove(id);
  }

  @Get('latest')
  findLatest() {
    return this.contractService.findLatest();
  }
}

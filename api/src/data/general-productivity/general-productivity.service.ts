import { Injectable } from '@nestjs/common';
import { CreateGeneralProductivityDto } from './dto/create-general-productivity.dto';
import { UpdateGeneralProductivityDto } from './dto/update-general-productivity.dto';

@Injectable()
export class GeneralProductivityService {
  create(createGeneralProductivityDto: CreateGeneralProductivityDto) {
    return 'This action adds a new generalProductivity';
  }

  findAll() {
    return `This action returns all generalProductivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generalProductivity`;
  }

  update(id: number, updateGeneralProductivityDto: UpdateGeneralProductivityDto) {
    return `This action updates a #${id} generalProductivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} generalProductivity`;
  }
}

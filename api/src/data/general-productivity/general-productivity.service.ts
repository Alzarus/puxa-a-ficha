import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneralProductivityDto } from './dto/create-general-productivity.dto';
import { UpdateGeneralProductivityDto } from './dto/update-general-productivity.dto';
import { GeneralProductivity } from './entities/general-productivity.entity';

@Injectable()
export class GeneralProductivityService {
  constructor(
    @InjectRepository(GeneralProductivity)
    private generalProductivityRepository: Repository<GeneralProductivity>,
  ) {}

  create(createGeneralProductivityDto: CreateGeneralProductivityDto) {
    const generalProductivity = this.generalProductivityRepository.create(
      createGeneralProductivityDto,
    );
    return this.generalProductivityRepository.save(generalProductivity);
  }

  findAll() {
    return this.generalProductivityRepository.find();
  }

  findOne(id: number) {
    return this.generalProductivityRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateGeneralProductivityDto: UpdateGeneralProductivityDto,
  ) {
    return this.generalProductivityRepository.update(
      id,
      updateGeneralProductivityDto,
    );
  }

  remove(id: number) {
    return this.generalProductivityRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCouncilorDto } from './dto/create-councilor.dto';
import { UpdateCouncilorDto } from './dto/update-councilor.dto';

@Injectable()
export class CouncilorService {
  create(createCouncilorDto: CreateCouncilorDto) {
    return 'This action adds a new councilor';
  }

  findAll() {
    return `This action returns all councilor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} councilor`;
  }

  update(id: number, updateCouncilorDto: UpdateCouncilorDto) {
    return `This action updates a #${id} councilor`;
  }

  remove(id: number) {
    return `This action removes a #${id} councilor`;
  }
}

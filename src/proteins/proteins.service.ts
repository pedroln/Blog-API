import { Injectable } from '@nestjs/common';
import { Protein } from './entities/protein.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProteinsService {

  constructor(
    @InjectRepository(Protein) private readonly proteinRepository: Repository<Protein>,
  ) {}


  findAllProtein(): Promise<Protein[]> {
    return this.proteinRepository.find();;
  }

  async findOne(id: number) {
    return await this.proteinRepository.findOne({ where: { id } })
  }

}

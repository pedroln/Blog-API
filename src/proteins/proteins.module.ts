import { Module } from '@nestjs/common';
import { ProteinsService } from './proteins.service';
import { ProteinsController } from './proteins.controller';
import { Protein } from './entities/protein.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Protein])],
  controllers: [ProteinsController],
  providers: [ProteinsService],
  exports: [ProteinsService]
})
export class ProteinsModule {}

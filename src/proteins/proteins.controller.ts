import { Controller, Get, Param, UseGuards  } from '@nestjs/common';
import { ProteinsService } from './proteins.service';
import { ApiKeyGuard } from 'src/auth/api-key-auth.guard';


@Controller('proteins')
export class ProteinsController {
  constructor(private readonly proteinsService: ProteinsService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  findAll() {
    return this.proteinsService.findAllProtein();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proteinsService.findOne(+id);
  }

}

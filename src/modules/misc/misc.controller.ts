import { Controller, Get } from '@nestjs/common';
import { MiscService } from './misc.service';

@Controller('misc')
export class MiscController {
  constructor(private readonly miscService: MiscService) {}

  @Get('rashid')
  rashid() {
    const currentCity = this.miscService.getRashidCity();
    return `Today Rashid is located on ${currentCity}.`;
  }

  @Get('rashid/city')
  rashidCity() {
    const currentCity = this.miscService.getRashidCity();
    return currentCity;
  }
}

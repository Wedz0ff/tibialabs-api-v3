import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MiscService } from './misc.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('misc')
@CacheTTL(60 * 10 * 1000)
@UseInterceptors(CacheInterceptor)
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

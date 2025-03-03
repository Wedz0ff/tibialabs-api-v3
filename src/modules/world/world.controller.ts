import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { WorldService } from './world.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('world')
@CacheTTL(60 * 5 * 1000)
@UseInterceptors(CacheInterceptor)
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Get('info/:name')
  async getWorldInfo(@Param('name') name: string): Promise<string> {
    const req = await this.worldService.getWorldData(name);
    return req;
  }

  @Get('all')
  async getAllWorlds(): Promise<string> {
    const req = await this.worldService.getAllWorldsData();
    return req;
  }
}

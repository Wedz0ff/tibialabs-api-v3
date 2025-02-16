import { Controller, Get, Param } from '@nestjs/common';
import { WorldService } from './world.service';

@Controller('world')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Get('info/:name')
  async getWorldInfo(@Param('name') name: string): Promise<string> {
    const req = await this.worldService.getWorldData(name);
    return req;
  }
}

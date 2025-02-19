import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { GuildService } from './guild.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('guild')
@CacheTTL(60 * 5 * 1000)
@UseInterceptors(CacheInterceptor)
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Get('info/:name')
  async getCharacter(@Param('name') name: string): Promise<string> {
    const req = await this.guildService.getGuildData(name);
    return req;
  }
}

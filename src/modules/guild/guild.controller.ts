import { Controller, Get, Param } from '@nestjs/common';
import { GuildService } from './guild.service';

@Controller('guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Get('info/:name')
  async getCharacter(@Param('name') name: string): Promise<string> {
    const req = await this.guildService.getGuildData(name);
    return req;
  }
}

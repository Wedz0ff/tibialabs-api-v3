import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { BoostedService } from './boosted.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('boosted')
@CacheTTL(60 * 5 * 1000)
@UseInterceptors(CacheInterceptor)
export class BoostedController {
  constructor(private readonly boostedService: BoostedService) {}

  @Get('creature')
  async BoostedCreature() {
    const creatureName = await this.boostedService.getCurrentBoostedCreature();
    return `Today's boosted creature: ${creatureName}`;
  }

  @Get('creature/:param')
  async BoostedCreatureParams(@Param('param') param: string) {
    if (param === 'name') {
      return this.boostedService.getCurrentBoostedCreature();
    }
    if (param === 'list') {
      return this.boostedService.getAllCreatures();
    }

    return `Invalid Parameter: ${param}`;
  }

  @Get('boss')
  async BoostedBoss() {
    const bossName = await this.boostedService.getCurrentBoostedBoss();
    return `Today's boosted boss: ${bossName}`;
  }

  @Get('boss/:param')
  async BoostedBossesParams(@Param('param') param: string) {
    if (param === 'name') {
      return this.boostedService.getCurrentBoostedBoss();
    }
    if (param === 'list') {
      return this.boostedService.getAllBosses();
    }

    return `Invalid Parameter: ${param}`;
  }
}

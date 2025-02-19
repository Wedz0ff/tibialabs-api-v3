import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BoostedService } from './boosted.service';

@Injectable()
export class BoostedScheduler {
  private readonly logger = new Logger(BoostedScheduler.name);

  constructor(private readonly boostedService: BoostedService) {}

  @Cron('10 9 * * *') // 10:10 CET
  @Cron('30 9 * * *') // 10:30 CET
  @Cron('0 10 * * *') // 11:00 CET
  async updateBoss() {
    this.logger.log('[START] Updating boosted creature for today.');

    try {
      await this.boostedService.updateBoostedBoss();
      this.logger.log('[DONE] Boosted Boss updated successfully.');
    } catch (error) {
      this.logger.error('[ERROR] Error updating boosted boss:', error);
    }
  }

  @Cron('10 9 * * *') // 10:10 CET
  @Cron('30 9 * * *') // 10:30 CET
  @Cron('0 10 * * *') // 11:00 CET
  async updateCreature() {
    this.logger.log('[START] Updating boosted creature for today');

    try {
      await this.boostedService.updateBoostedCreature();
      this.logger.log('[DONE] Boosted creature updated successfully.');
    } catch (error) {
      this.logger.error('[ERROR] Error updating boosted creature:', error);
    }
  }
}

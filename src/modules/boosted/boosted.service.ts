import { PrismaService } from '@modules/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { BoostedSchema } from './boosted.interface';
import {
  TibiaDataBoostedBoss,
  TibiaDataBoostedCreature,
} from '@modules/tibiadata/tibiadata.interface';
import { TibiaDataService } from '@modules/tibiadata/tibiadata.service';

@Injectable()
export class BoostedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tibiaDataService: TibiaDataService,
  ) {}

  async getAllCreatures() {
    return this.prisma.creature.findMany();
  }

  async createCreature(data: BoostedSchema) {
    return this.prisma.creature.create({
      data,
    });
  }

  async getCurrentBoostedCreature(): Promise<string> {
    const url = `creatures`;
    const { data } =
      await this.tibiaDataService.tibiaDataRequest<TibiaDataBoostedCreature>(
        url,
      );

    if (!data) {
      return `Couldn't get creature name.`;
    }

    const { name } = data.creatures.boosted;
    return name;
  }

  async getAllBosses() {
    return this.prisma.boss.findMany();
  }

  async createBoss(data: BoostedSchema) {
    return this.prisma.boss.create({
      data,
    });
  }

  async getCurrentBoostedBoss(): Promise<string> {
    const url = `boostablebosses`;
    const { data } =
      await this.tibiaDataService.tibiaDataRequest<TibiaDataBoostedBoss>(url);

    if (!data) {
      return `Couldn't get Boss name.`;
    }

    const { name } = data.boostable_bosses.boosted;
    return name;
  }
}

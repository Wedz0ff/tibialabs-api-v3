import { PrismaService } from '@modules/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { BoostedSchema } from './boosted.interface';
import {
  TibiaDataBoostedBoss,
  TibiaDataBoostedCreature,
} from '@modules/tibiadata/tibiadata.interface';
import { TibiaDataService } from '@modules/tibiadata/tibiadata.service';
import * as dayjs from 'dayjs';

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

  async updateBoostedCreature() {
    const boostedCreature = (
      await this.getCurrentBoostedCreature()
    ).toLocaleLowerCase();

    if (!boostedCreature) {
      console.log(`Couldn't fetch boosted creature`);
      return;
    }

    const today = dayjs().startOf('day').toDate();

    const existingEntry = await this.prisma.creature.findFirst({
      where: { date: today },
    });

    if (existingEntry) {
      await this.prisma.creature.update({
        where: { id: existingEntry.id },
        data: { name: boostedCreature },
      });
    } else {
      await this.prisma.creature.create({
        data: { date: today, name: boostedCreature },
      });
    }

    return 'Updated boosted creature.';
  }

  async updateBoostedBoss() {
    const boostedBoss = (
      await this.getCurrentBoostedBoss()
    ).toLocaleLowerCase();

    if (!boostedBoss) {
      console.log(`Couldn't fetch boosted creature`);
      return;
    }

    const today = dayjs().startOf('day').toDate();

    const existingEntry = await this.prisma.boss.findFirst({
      where: { date: today },
    });

    if (existingEntry) {
      await this.prisma.boss.update({
        where: { id: existingEntry.id },
        data: { name: boostedBoss },
      });
    } else {
      await this.prisma.boss.create({
        data: { date: today, name: boostedBoss },
      });
    }

    return 'Updated boosted boss.';
  }
}

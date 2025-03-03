import {
  TibiaDataAllWorlds,
  TibiaDataWorld,
  World,
} from '@modules/tibiadata/tibiadata.interface';
import { TibiaDataService } from '@modules/tibiadata/tibiadata.service';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class WorldService {
  constructor(private readonly tibiaDataService: TibiaDataService) {}

  async getWorldData(worldName: string): Promise<string> {
    const url = `world/${worldName}`;
    const { data } =
      await this.tibiaDataService.tibiaDataRequest<TibiaDataWorld>(url);

    if (!data) {
      return `Couldn't find a world named: ${worldName}.`;
    }

    const {
      name,
      players_online,
      record_players,
      record_date,
      creation_date,
      pvp_type,
    } = data.world;

    const creationDate = dayjs(creation_date).format('DD/MM/YYYY');
    const recordDate = dayjs(record_date).format('DD/MM/YYYY');

    return `${name} (${pvp_type}) was created on ${creationDate}. Online record: ${record_players} on ${recordDate}. There are ${players_online} players online.`;
  }

  async getAllWorldsData(): Promise<string> {
    const url = `worlds`;
    const { data } =
      await this.tibiaDataService.tibiaDataRequest<TibiaDataAllWorlds>(url);

    if (!data) {
      return `Couldn't fetch worlds data.`;
    }

    const { players_online, regular_worlds } = data.worlds;

    const mostPopulatedWorldRightNow: World = regular_worlds.reduce(
      (max, world) => (world.players_online > max.players_online ? world : max),
    );

    return `There are ${players_online} players online in all worlds. FYI: ${mostPopulatedWorldRightNow.name} is the most populated world with ${mostPopulatedWorldRightNow.players_online} players online right now.`;
  }
}

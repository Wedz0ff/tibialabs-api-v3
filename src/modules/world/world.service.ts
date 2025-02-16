import { TibiaDataWorld } from '@modules/tibiadata/tibiadata.interface';
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
}

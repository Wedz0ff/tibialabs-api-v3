import { TibiaDataGuild } from '@modules/tibiadata/tibiadata.interface';
import { TibiaDataService } from '@modules/tibiadata/tibiadata.service';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class GuildService {
  constructor(private readonly tibiaDataService: TibiaDataService) {}

  async getGuildData(guildName: string): Promise<string> {
    const url = `guild/${guildName}`;
    const response =
      await this.tibiaDataService.tibiaDataRequest<TibiaDataGuild>(url);

    const statusCode = response.information.status.http_code;

    if (statusCode === 200) {
      const { name, world, members, players_online, members_total, founded } =
        response.guild;

      const foundedDate = dayjs(founded).format('DD/MM/YYYY');
      const avgLevel: number = members.length
        ? Math.round(
            members.reduce(
              (sum: number, member: { level: number }) => sum + member.level,
              0,
            ) / members.length,
          )
        : 0;

      return `${name} (World: ${world} - Avg Level: ${avgLevel}) has ${players_online}/${members_total} members online right now. This guild was founded on ${foundedDate}.`;
    }
    return `Couldn't find a guild named: ${guildName}`;
  }
}

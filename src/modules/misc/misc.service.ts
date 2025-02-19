import { Injectable } from '@nestjs/common';

@Injectable()
export class MiscService {
  getRashidCity(): string {
    const cities: Record<string, string> = {
      monday: 'Svargrond',
      tuesday: 'Liberty Bay',
      wednesday: 'Port Hope',
      thursday: 'Ankrahmun',
      friday: 'Darashia',
      saturday: 'Edron',
      sunday: 'Carlin',
    };

    // We aren't using dayjs here bcuz for some reason tz wasn't working.
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Metlakatla',
      weekday: 'long',
    });

    const weekDay = formatter.format(new Date()).toLowerCase();
    return cities[weekDay];
  }
}

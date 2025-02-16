import { TibiaDataCharacter } from '@modules/tibiadata/tibiadata.interface';
import { TibiaDataService } from '@modules/tibiadata/tibiadata.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CharacterService {
  constructor(private readonly tibiaDataService: TibiaDataService) {}

  async getCharacterData(characterName: string): Promise<string> {
    const url = `character/${characterName}`;
    const { data } =
      await this.tibiaDataService.tibiaDataRequest<TibiaDataCharacter>(url);

    if (!data) {
      return `Couldn't find character named: ${characterName}.`;
    }

    const { name, level, vocation, world } = data.character.character;

    return `Character: ${name} - Level: ${level} - Vocation: ${vocation} - World: ${world}`;
  }

  getSharedExpLevelRange(level: number): string {
    if (level <= 0) {
      return 'Please provide a valid level.';
    }

    const minLevel = Math.floor(level / 1.5);
    const maxLevel = Math.round(level * 1.5);

    return `A level ${level} can share experience with levels ${minLevel} to ${maxLevel}.`;
  }
}

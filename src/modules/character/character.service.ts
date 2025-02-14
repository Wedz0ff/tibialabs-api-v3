import { TibiaDataCharacter } from '@modules/tibiadata/tibiadata.interface';
import { TibiaDataService } from '@modules/tibiadata/tibiadata.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CharacterService {
  constructor(private readonly tibiaDataService: TibiaDataService) {}

  async getCharacterData(characterName: string): Promise<string> {
    const url = `character/${characterName}`;
    const response =
      await this.tibiaDataService.tibiaDataRequest<TibiaDataCharacter>(url);

    const statusCode = response.information.status.http_code;

    if (statusCode === 200) {
      const { name, level, vocation, world } = response.character.character;
      return `Character: ${name} - Level: ${level} - Vocation: ${vocation} - World: ${world}`;
    }
    return `Couldn't find character named: ${characterName}`;
  }
}

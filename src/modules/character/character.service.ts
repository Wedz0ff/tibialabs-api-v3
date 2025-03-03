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

  getExperienceToLevel(startLevel: number, targetLevel?: number): string {
    const target = targetLevel || startLevel + 1;

    if (target <= startLevel) {
      return `Target level must be higher than the current level.`;
    }

    const experienceNeeded =
      this.getTotalExpForLevel(target) - this.getTotalExpForLevel(startLevel);

    return `A character level ${startLevel} needs ${experienceNeeded.toLocaleString('de-DE')} experience points to reach level ${target}.`;
  }

  private getTotalExpForLevel(level: number): number {
    return level < 0
      ? 0
      : Math.floor((50 / 3) * (level ** 3 - 6 * level ** 2 + 17 * level - 12));
  }
}

import { TibiaDataCharacterProps } from '@modules/tibiadata/tibiadata.interface';
import { TibiaDataService } from '@modules/tibiadata/tibiadata.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CharacterService {
  constructor(private readonly tibiaDataService: TibiaDataService) {} // ✅ Inject correctly

  async getCharacterData(
    characterName: string,
  ): Promise<TibiaDataCharacterProps> {
    const url = `character/${characterName}`;
    return await this.tibiaDataService.tibiaDataRequest<TibiaDataCharacterProps>(
      url,
    );
  }
}

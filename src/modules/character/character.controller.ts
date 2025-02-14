import { Controller, Get, Param } from '@nestjs/common';
import { CharacterService } from './character.service';
import { TibiaDataCharacterProps } from '@modules/tibiadata/tibiadata.interface';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get(':name')
  async getCharacter(
    @Param('name') name: string,
  ): Promise<TibiaDataCharacterProps> {
    console.log('Received request for character:', name);
    return this.characterService.getCharacterData(name);
  }
}

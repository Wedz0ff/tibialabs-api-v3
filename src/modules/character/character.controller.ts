import { Controller, Get, Param } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get(':name')
  async getCharacter(@Param('name') name: string): Promise<string> {
    console.log('Received request for character:', name);
    const req = await this.characterService.getCharacterData(name);
    return req;
  }
}

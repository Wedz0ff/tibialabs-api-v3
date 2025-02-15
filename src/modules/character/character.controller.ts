import { Controller, Get, Param } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get('info/:name')
  async getCharacter(@Param('name') name: string): Promise<string> {
    const req = await this.characterService.getCharacterData(name);
    return req;
  }

  @Get('sharelevel/:level')
  getSharedRange(@Param('level') level: string): string {
    const charLvl = parseInt(level, 10);
    return this.characterService.getSharedExpLevelRange(charLvl);
  }
}

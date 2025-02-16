import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterController } from '@modules/character/character.controller';
import { CharacterService } from '@modules/character/character.service';
import { TibiaDataService } from '@modules/tibiadata/tibiadata.service';
import { HttpModule } from '@nestjs/axios';
import { GuildController } from '@/modules/guild/guild.controller';
import { GuildService } from '@/modules/guild/guild.service';
import { WorldController } from '@/modules/world/world.controller';
import { WorldService } from '@/modules/world/world.service';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    CharacterController,
    GuildController,
    WorldController,
  ],
  providers: [
    AppService,
    CharacterService,
    TibiaDataService,
    GuildService,
    WorldService,
  ],
})
export class AppModule {}

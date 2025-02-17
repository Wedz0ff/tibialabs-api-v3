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
import { BoostedController } from '@modules/boosted/boosted.controller';
import { BoostedService } from '@modules/boosted/boosted.service';
import { PrismaService } from '@modules/db/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    CharacterController,
    GuildController,
    WorldController,
    BoostedController,
  ],
  providers: [
    AppService,
    CharacterService,
    TibiaDataService,
    GuildService,
    WorldService,
    BoostedService,
    PrismaService,
  ],
})
export class AppModule {}

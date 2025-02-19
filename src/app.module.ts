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
import { ScheduleModule } from '@nestjs/schedule';
import { BoostedScheduler } from '@modules/boosted/boosted.scheduler';
import { MiscService } from './modules/misc/misc.service';
import { MiscController } from './modules/misc/misc.controller';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  controllers: [
    AppController,
    CharacterController,
    GuildController,
    WorldController,
    BoostedController,
    MiscController,
  ],
  providers: [
    AppService,
    CharacterService,
    TibiaDataService,
    GuildService,
    WorldService,
    BoostedService,
    PrismaService,
    BoostedScheduler,
    MiscService,
  ],
})
export class AppModule {}

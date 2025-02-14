import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterController } from '@modules/character/character.controller';
import { CharacterService } from '@modules/character/character.service';
import { TibiaDataService } from '@modules/tibiadata/tibiadata.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController, CharacterController],
  providers: [AppService, CharacterService, TibiaDataService],
})
export class AppModule {}

export interface TibiaDataResponse<T> {
  data?: T;
  error?: string;
  statusCode: number;
}

export interface TibiaDataCharacter {
  character: {
    character: {
      name: string;
      vocation: string;
      level: number;
      world: string;
    };
  };
}

export interface TibiaDataGuild {
  guild: {
    name: string;
    world: string;
    founded: string;
    players_online: number;
    members_total: number;
    members: any[];
  };
}

export interface TibiaDataWorld {
  world: {
    name: string;
    players_online: number;
    record_players: number;
    record_date: string;
    creation_date: string;
    pvp_type: string;
  };
}

export interface TibiaDataBoostedBoss {
  boostable_bosses: {
    boosted: {
      name: string;
    };
  };
}

export interface TibiaDataBoostedCreature {
  creatures: {
    boosted: {
      name: string;
    };
  };
}

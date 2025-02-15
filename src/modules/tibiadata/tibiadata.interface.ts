export interface TibiaDataDefaultResponse {
  information: {
    status: {
      http_code: number;
    };
  };
  data: any[];
}

export interface TibiaDataCharacter extends TibiaDataDefaultResponse {
  character: {
    character: {
      name: string;
      vocation: string;
      level: number;
      world: string;
    };
  };
}

export interface TibiaDataGuild extends TibiaDataDefaultResponse {
  guild: {
    name: string;
    world: string;
    founded: string;
    players_online: number;
    members_total: number;
    members: any[];
  };
}

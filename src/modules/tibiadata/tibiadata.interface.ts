// export interface TibiaDataDefaultResponse {
//   data?: {
//     information: {
//       status: {
//         http_code: number;
//       };
//     };
//     data: any[];
//   };
//   error?: any;

// }

// export interface TibiaDataCharacter extends TibiaDataDefaultResponse {
//   character: {
//     character: {
//       name: string;
//       vocation: string;
//       level: number;
//       world: string;
//     };
//   };
// }

// export interface TibiaDataGuild extends TibiaDataDefaultResponse {
//   guild: {
//     name: string;
//     world: string;
//     founded: string;
//     players_online: number;
//     members_total: number;
//     members: any[];
//   };
// }

// export interface TibiaDataWorld extends TibiaDataDefaultResponse {
//   world: {
//     name: string;
//     players_online: number;
//     record_players: number;
//     record_date: string;
//     creation_date: string;
//     pvp_type: string;
//   };
// }

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

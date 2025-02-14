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

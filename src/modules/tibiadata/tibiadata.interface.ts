export interface TibiaDataCharacter {
  character: TibiaDataCharacterProps[];
}

export interface TibiaDataCharacterProps extends TibiaDataCharacter {
  name: string;
  vocation: string;
  level: number;
  world: string;
}

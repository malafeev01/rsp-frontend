export type PlayerType = {
  nickname: string;
};

export type ActionType = {
  nickname: string;
  action: string;
};

export type RoundType = {
  actions: Array<ActionType>;
  winner: string;
};

export type GameType = {
  max_rounds: number;
  players: Array<PlayerType>;
  current_round: number;
  rounds: Array<RoundType>;
  state: string;
};

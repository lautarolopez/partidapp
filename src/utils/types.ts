/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
export type PossibleMatchStatus =
  | 0
  | 1
  | 11
  | 12
  | 13
  | 14
  | 15
  | 2
  | 3
  | 31
  | 32
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 17;

export interface Stage {
  stage_id: number;
  name: string;
}

export interface Group {
  group_id: number;
  group_name: string;
}

export interface Round {
  round_id: number;
  name: string;
  is_current?: any;
}

export interface Country {
  country_id: number;
  name: string;
  country_code: string;
  continent: string;
}

export interface Team {
  team_id: number;
  name: string;
  short_code: string;
  common_name: string;
  logo: string;
  country: Country;
}

export interface Stats {
  home_score: number;
  away_score: number;
  ht_score: string;
  ft_score: string;
  et_score?: any;
  ps_score?: any;
}

export interface Venue {
  venue_id: number;
  name: string;
  capacity: number;
  city: string;
  country_id: number;
}

export interface Match {
  match_id: number;
  status_code: PossibleMatchStatus;
  status: string;
  match_start: string;
  match_start_iso: Date;
  minute: number;
  league_id: number;
  season_id: number;
  stage: Stage;
  group: Group;
  round: Round;
  referee_id?: any;
  home_team: Team;
  away_team: Team;
  stats: Stats;
  venue: Venue;
}

export interface SportDataResponse {
  query: unknown;
  data: Array<Match>;
}

export interface IFavorite {
  matchday: number;
  index: number;
}

export interface MatchesState {
  currentMatchday: number;
  matchDays: Array<number>;
  matches: Record<number, Array<Match>>;
  favorites: Array<IFavorite>;
}

export interface RouteParams {
  matchday: string;
  index: string;
}

export interface Comment {
  id?: string;
  nickname: string;
  comment: string;
  userId: string;
  matchday: number;
  index: number;
  image: string;
}

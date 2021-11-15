import _ from 'lodash';

import { Match } from '../utils/types';

/** The matches came with the round number inside the round property.
 * We first get all the unique rounds (array of numbers), and initiate
 * the value on the record with no matches. Then we push every match
 * on its corresponding array. */

/* eslint-disable import/prefer-default-export */
export const sortMatches = (
  matches: Array<Match>
): Record<number, Array<Match>> => {
  const rounds = getRounds(matches);
  const returnValue: Record<number, Array<Match>> = {};
  rounds.forEach((round: number) => {
    returnValue[round] = [];
  });
  matches.forEach((match: Match) => {
    returnValue[Number(match.round.name)].push(match);
  });
  return returnValue;
};

export const getRounds = (matches: Array<Match>): Array<number> =>
  _.uniq(matches.map((match: Match) => Number(match.round.name)));

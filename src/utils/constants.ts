/* eslint-disable max-len */
import { PossibleMatchStatus } from './types';

export const COLORS = {
  PRIMARY: '#1C0C5B',
  SECONDARY: '#3D2C8D',
  ALTERNATIVE: '#916BBF',
  DANGER: '#C996CC',
};

export const MATCH_STATUS: Record<PossibleMatchStatus, string> = {
  0: 'Not started',
  1: 'Live',
  11: 'Half-time',
  12: 'Extra-time',
  13: 'Penalties',
  14: 'Break-time',
  15: 'Awarding',
  2: 'Update later',
  3: 'Ended',
  31: 'After penalties',
  32: 'After extra-time',
  4: 'Postponed',
  5: 'Cancelled',
  6: 'Abandoned',
  7: 'Interrupted',
  8: 'Suspended',
  9: 'Awarded',
  10: 'Delayed',
  17: 'To be announced',
};

export const MESSI_ILLUSTRATION =
  'https://cdn.dribbble.com/users/2181015/screenshots/4422483/media/49757fcb2d8586695e00b99b06cefabf.png?compress=1&resize=400x300';

export const FAVORITES_COLLECTION = 'favorites';

export const COMMENTS_COLLECTION = 'comments';

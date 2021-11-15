import axios, { AxiosError, AxiosResponse } from 'axios';

import { Match, SportDataResponse } from '../utils/types';

const apiUrl = import.meta.env.VITE_SPORT_DATA_URL;
const apiKey = import.meta.env.VITE_SPORT_DATA_API_KEY;
const seasonId = import.meta.env.VITE_CURRENT_SEASON_ID;

const MatchesService = {
  getAllMatches: async (): Promise<Array<Match>> =>
    axios
      .get<SportDataResponse>(
        `${apiUrl}/matches?apikey=${apiKey}&season_id=${seasonId}`
      )
      .then(
        (response: AxiosResponse<SportDataResponse, unknown>) =>
          response.data.data
      )
      .catch((error: AxiosError) => {
        throw new Error(error.message);
      }),
};

export default MatchesService;

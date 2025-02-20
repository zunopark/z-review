import { create } from 'zustand'
import { collection, query, orderBy, limit, getDocs} from 'firebase/firestore'
import { db } from '../../firebase'
import axios from 'axios';

interface IMovie {
    movieNm: string;
    openDt: string;
    prdtYear: string;
    type: string;
}

interface SearchState {
  searchMovieListData: any[]
  getMovie: (value: string) => Promise<void>
  resetSearchMovieListData: () => void
}

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined');
}

export const useSearchStore = create<SearchState>((set) => ({
  searchMovieListData: [],

  getMovie: async (value: string) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${TMDB_API_KEY}`,
            'accept': 'application/json'
        }
    });
    set({ searchMovieListData: response.data.results });
  },

  resetSearchMovieListData: () => {
    set({ searchMovieListData: [] });
  }
}))
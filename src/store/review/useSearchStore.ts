import { create } from 'zustand'
import { collection, query, orderBy, limit, getDocs} from 'firebase/firestore'
import { db } from '../../firebase'
import axios from 'axios';
import { parseXMLtoJSON } from '../../util';

interface SearchState {
  searchedListData: any[]
  getMovie: (value: string) => Promise<void>
  getMusic: (value: string) => Promise<void>
  getAnime: (value: string) => Promise<void>
  getTvShow: (value: string) => Promise<void>
  resetSearchMovieListData: () => void
}

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined');
}

export const useSearchStore = create<SearchState>((set) => ({
  searchedListData: [],

  getMovie: async (value: string) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${TMDB_API_KEY}`,
            'accept': 'application/json'
        }
    });
    set({ searchedListData: response.data.results });
  },

  getMusic: async (value: string) => {},

  getAnime: async (value: string) => {
    const url = `https://api.themoviedb.org/3/search/tv?query=${value}`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${TMDB_API_KEY}`,
            'accept': 'application/json'
        }
    });
    set({ searchedListData: response.data.results });
  },

  getTvShow: async (value: string) => {
    const url = `https://api.themoviedb.org/3/search/tv?query=${value}`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${TMDB_API_KEY}`,
            'accept': 'application/json'
        }
    });
    set({ searchedListData: response.data.results });
  },

  resetSearchMovieListData: () => {
    set({ searchedListData: [] });
  }
}))
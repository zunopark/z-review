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

export const useSearchStore = create<SearchState>((set) => ({
  searchMovieListData: [],

  getMovie: async (value: string) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTc4MTM4ZDg5M2NjNTkxZmRhOWZmZDhmM2FlYjlhOSIsIm5iZiI6MTYwOTQ4OTgzMC4zMTAwMDAyLCJzdWIiOiI1ZmVlZGRhNjE3NmE5NDAwNDVlNTc3YmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.E09VlwdpQbRJ9m7SJiT6Bsg_yjdtrVnHgFZLEMUrsC0',
            'accept': 'application/json'
        }
    });
    console.log(response);
    set({ searchMovieListData: response.data.results });
  },
  
  resetSearchMovieListData: () => {
    set({ searchMovieListData: [] });
  }
}))
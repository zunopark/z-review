import { create } from 'zustand';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  addDoc,
  where,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';

export interface IReview {
  id?: string; // unique id of review
  userDescription: string;
  storyRating: number;
  characterRating: number;
  technicalRating: number;
  themeRating: number;
  recommendationRating: number;
  createdAt: number;
  userName: string;
  userId: string; // unique id of user
  fileUrls: string[];
  contentName: string;
  contentId: string;
  category: string; // 영화, 드라마, 애니메이션, 영화 등
  userProfileImageUrl: string;
}

interface BookmarkState {
  bookmarks: IReview[];
  isLoading: boolean;
  isError: boolean;
  getBookmarks: (userId: string) => Promise<void>;
  addBookmark: (userId: string, review: IReview) => Promise<void>;
}

const LIMIT = 30;

export const useBookmarkStore = create<BookmarkState>((set) => ({
  bookmarks: [],
  isLoading: false,
  isError: false,

  addBookmark: async (userId: string, review: IReview) => {
    set({ isLoading: true });
    try {
        console.log(userId, review);
      const bookmarksRef = collection(db, `users/${userId}/bookmarks`);
      await addDoc(bookmarksRef, {
        ...review,
        createdAt: serverTimestamp(),
      });
      
      // Refresh bookmarks list after adding
      const currentBookmarks = useBookmarkStore.getState().bookmarks;
      set({ bookmarks: [{ ...review }, ...currentBookmarks] });
    } catch (error) {
      console.error('Error adding bookmarks:', error);
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },

  getBookmarks: async (userId: string) => {
    set({ isLoading: true });
    try {
      const bookmarksRef = collection(db, `users/${userId}/bookmarks`);
      const querySnapshot = await getDocs(
        query(
          bookmarksRef,
          orderBy('createdAt', 'desc'),
          limit(LIMIT)
        )
      );
      
      const bookmarks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as IReview[];
      
      set({ bookmarks });
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));

import { create } from 'zustand'
import { collection, query, orderBy, limit, onSnapshot, getDocs, addDoc, where, writeBatch } from 'firebase/firestore'
import { db } from '../../firebase'

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
}

interface ReviewState {
  reviews: IReview[]
  userReviews: IReview[]
  isLoading: boolean
  isError: boolean
  getReviews: () => Promise<void>
  getUserReviews: (userId: string) => Promise<void>
  getRealtimeReviews: () => Promise<void>
  postReviewToFirebase: (review: IReview) => Promise<string>
  updateUserReviewsName: (userId: string, newName: string) => Promise<boolean>
  unsubscribe: (() => void) | null
}

const REVIEW_LIMIT = 20;
const REVIEWS_COLLECTION = "reviews";

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  userReviews: [],
  unsubscribe: null,
  isLoading: false,
  isError: false,

  postReviewToFirebase: async (review: IReview) => {
    set({ isLoading: true });
    try {
      const reviewRef = collection(db, REVIEWS_COLLECTION);
      const docRef = await addDoc(reviewRef, review);
      return docRef.id;
    } catch (error) {
      console.error("Error posting review to Firebase:", error);
      set({ isError: true });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getReviews: async () => {
    set({ isLoading: true });
    try {
      const reviewRef = collection(db, REVIEWS_COLLECTION)
      const querySnapshot = await getDocs(query(reviewRef, orderBy("createdAt", "desc"), limit(REVIEW_LIMIT)));

    const reviews = querySnapshot.docs.map((doc) => {
    const { text, createdAt, userName, userId, fileUrls, contentName, contentId, category, userDescription, storyRating, characterRating, technicalRating, themeRating, recommendationRating } = doc.data();
    return {
        id: doc.id,
        text,
        createdAt,
        userName,
        userId,
        fileUrls,
        contentName,
        contentId,
        category,
        userDescription,
        storyRating,
        characterRating,
        technicalRating,
        themeRating,
        recommendationRating
    };
    });
    set({ reviews });
    } catch (error) {
      console.error("Error getting reviews:", error);
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },

  getUserReviews: async (userId: string) => {
    set({ isLoading: true });
    try {
      const reviewRef = collection(db, REVIEWS_COLLECTION)
      const querySnapshot = await getDocs(query(reviewRef, where("userId", "==", userId), orderBy("createdAt", "desc"), limit(REVIEW_LIMIT)));
      const reviews = querySnapshot.docs.map((doc) => {
      const { text, createdAt, userName, userId, fileUrls, contentName, contentId, category, userDescription, storyRating, characterRating, technicalRating, themeRating, recommendationRating } = doc.data();
      return {
        id: doc.id,
        text,
        createdAt,
        userName,
        userId,
        fileUrls,
        contentName,
        contentId,
        category,
        userDescription,
        storyRating,
        characterRating,
        technicalRating,
        themeRating,
        recommendationRating
      };
    });
    set({ userReviews: reviews });
    } catch (error) {
      console.error("Error getting user reviews:", error);
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },

  getRealtimeReviews: async () => {
    set({ isLoading: true });
    try {
      const reviewRef = collection(db, REVIEWS_COLLECTION)
      const q = query(reviewRef, orderBy("createdAt", "desc"), limit(REVIEW_LIMIT))
      
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map((doc) => {
        const { text, createdAt, userName, userId, fileUrls, contentName, contentId, category, userDescription, storyRating, characterRating, technicalRating, themeRating, recommendationRating } = doc.data()
        return {
          id: doc.id,
          text,
          createdAt,
          userName,
          userId,
          fileUrls,
          contentName,
          contentId,
          category,
          userDescription,
          storyRating,
          characterRating,
          technicalRating,
          themeRating,
          recommendationRating
        }
      });
      set({ reviews });
    })
    
    set({ unsubscribe });
    } catch (error) {
      console.error("Error getting realtime reviews:", error);
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserReviewsName: async (userId: string, newName: string) => {
    set({ isLoading: true });
    try {
      const batch = writeBatch(db);
      const reviewsRef = collection(db, REVIEWS_COLLECTION);
      const q = query(reviewsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { userName: newName });
      });
      
      await batch.commit();
      
      set((state) => ({
        userReviews: state.userReviews.map(review => ({
          ...review,
          userName: newName
        }))
      }));
      
      return true;
    } catch (error) {
      console.error("Error updating review usernames:", error);
      set({ isError: true });
      return false;
    } finally {
      set({ isLoading: false });
    }
  }
}))
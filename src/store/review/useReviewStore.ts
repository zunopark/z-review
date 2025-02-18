import { create } from 'zustand'
import { collection, query, orderBy, limit, onSnapshot, getDocs, addDoc, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { IReview } from '../../components/review/review-components'

interface ReviewState {
  reviews: IReview[]
  userReviews: IReview[]
  getReviews: () => Promise<void>
  getUserReviews: (userId: string) => Promise<void>
  getRealtimeReviews: () => Promise<void>
  postReviewToFirebase: (review: IReview) => Promise<string>
  unsubscribe: (() => void) | null
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  userReviews: [],
  unsubscribe: null,

  postReviewToFirebase: async (review: IReview) => {
    const reviewRef = collection(db, "reviews");
    const docRef = await addDoc(reviewRef, review);
    return docRef.id;
  },

  getReviews: async () => {
    const reviewRef = collection(db, "reviews")
    const querySnapshot = await getDocs(query(reviewRef, orderBy("createdAt", "desc"), limit(20)));

    const reviews = querySnapshot.docs.map((doc) => {
    const { text, rating, createdAt, username, userId, fileUrls, content, category } = doc.data();
    return {
        id: doc.id,
        text,
        rating,
        createdAt,
        username,
        userId,
        fileUrls,
        content,
        category
    };
    });
    set({ reviews });
  },

  getUserReviews: async (userId: string) => {
    const reviewRef = collection(db, "reviews")
    const querySnapshot = await getDocs(query(reviewRef, where("userId", "==", userId), orderBy("createdAt", "desc"), limit(20)));
    const reviews = querySnapshot.docs.map((doc) => {
      const { text, rating, createdAt, username, userId, fileUrls, content, category } = doc.data();
      return {
        id: doc.id,
        text,
        rating,
        createdAt,
        username,
        userId,
        fileUrls,
        content,
        category
      };
    });
    set({ userReviews: reviews });
  },

  getRealtimeReviews: async () => {
    const reviewRef = collection(db, "reviews")
    const q = query(reviewRef, orderBy("createdAt", "desc"), limit(20))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map((doc) => {
        const { text, rating, createdAt, username, userId, fileUrls, content, category } = doc.data()
        return {
          id: doc.id,
          text,
          rating,
          createdAt,
          username,
          userId,
          fileUrls,
          content,
          category
        }
      });
      set({ reviews });
    })
    
    set({ unsubscribe });
  }
}))
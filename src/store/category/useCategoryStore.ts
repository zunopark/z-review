import { create } from 'zustand';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

interface ICategory {
  id: string;
  name: string;
  count: number;
  indexName: string;
}

interface CategoryState {
  categoryListData: ICategory[];
  getCategory: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categoryListData: [],

  getCategory: async () => {
    const reviewRef = collection(db, 'category');
    const querySnapshot = await getDocs(
      query(reviewRef, orderBy('count', 'desc'), limit(20)),
    );

    const categoryListData = querySnapshot.docs.map((doc) => {
      const { name, count, indexName } = doc.data();
      return {
        id: doc.id,
        name,
        count,
        indexName,
      };
    });
    set({ categoryListData: categoryListData });
  },
}));

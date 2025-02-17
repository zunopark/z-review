import styled from 'styled-components';
import Review from "../components/review/review";
import { useEffect, useState } from 'react';
import { doc, getDocs, limit, onSnapshot } from 'firebase/firestore';
import { collection, query, orderBy } from 'firebase/firestore';
import { IReview } from '../components/review/review-components';
import { db } from '../firebase';
import { Unsubscribe } from 'firebase/auth';

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function Home() {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchReviews = async () => {
      const reviewRef = collection(db, "reviews");
      const q = query(reviewRef, orderBy("createdAt", "desc"), limit(20));
      
      // static update
      // const querySnapshot = await getDocs(q);
      // const reviews = querySnapshot.docs.map((doc) => {
      //   const { text, rating, createdAt, username, userId, fileUrls, content, category } = doc.data();
      //   return {
      //     id: doc.id,
      //     text,
      //     rating,
      //     createdAt,
      //     username,
      //     userId,
      //     fileUrls,
      //     content,
      //     category
      //   };
      // });
      
      // realtime update
      unsubscribe = await onSnapshot(q, (snapshot) => {
        const reviews = snapshot.docs.map((doc) => {
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
        setReviews(reviews);
      });
      return () => unsubscribe?.();
    };
    fetchReviews();
  }, []);

  return (
    <ReviewsContainer>
      {reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </ReviewsContainer>
  )
}
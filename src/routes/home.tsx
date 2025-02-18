import styled from 'styled-components';
import Review from "../components/review/review";
import { useEffect } from 'react';
import { useReviewStore } from '../store/review/useReviewStore';

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function Home() {
  const { reviews, getRealtimeReviews, unsubscribe } = useReviewStore();

  useEffect(() => {
    getRealtimeReviews();
    return () => unsubscribe?.();
  }, []);

  return (
    <ReviewsContainer>
      {reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </ReviewsContainer>
  )
}
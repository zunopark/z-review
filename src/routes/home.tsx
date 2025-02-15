import styled from 'styled-components';
import Review from "../components/review/review";

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function Home() {
  return (
    <ReviewsContainer>
      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item) => (
        <Review key={item} />
      ))}
    </ReviewsContainer>
  )
}
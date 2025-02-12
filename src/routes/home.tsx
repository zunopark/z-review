import styled from "styled-components";
import PostReview from "../components/post-review";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default function Home() {
  return (
    <Wrapper>
      <PostReview />
    </Wrapper>
  )
}

import styled from "styled-components";

const TopContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;  

const Category = styled.span`
  font-size: 12px;
  color: #70767B;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const NumofCategory = styled.span`
  font-size: 12px;
  color: #70767B;
`;

const Picture = styled.div`
`;

const PictureImage = styled.img`
  width: 50px;
  height: 50px;
`;



export default function Trending() {
  return (
    <TopContent>
        <Info>
            <Category>영화</Category>
            <Title>인터스텔라</Title>
            <NumofCategory>2000 reviews</NumofCategory>
        </Info>
        <Picture>
            <PictureImage src="https://picsum.photos/200/300" alt="picture" />
        </Picture>
    </TopContent>
  );
}

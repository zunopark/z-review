import styled from "styled-components";

const BottomContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const SubName = styled.span`
  font-size: 12px;
  color: #70767B;
`;

const FollowButton = styled.button`
  background-color: #D7DBDC;
  color: black;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default function Follow() {
  return (
    <BottomContent>
        <Content>
            <ProfileImage src="https://picsum.photos/200/300" alt="profile" />
            <Info>
                <Name>zzunopark</Name>
            <SubName>@zzunopark</SubName>
            </Info>
        </Content>
        <FollowButton>Follow</FollowButton>
    </BottomContent>
  );
}

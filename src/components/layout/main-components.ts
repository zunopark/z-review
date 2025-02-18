import styled from "styled-components";

export const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding-left: 230px;
  box-sizing: border-box;
`;

export const MainContainer = styled.div`
  flex: 0 1 auto;
  overflow-y: auto;
  padding: 20px;
  border-right: 1px solid rgb(47, 51, 54);
  width: 100%;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const Sidebar = styled.div`
  flex: 0 0 auto;
  width: 320px;
  height: fit-content;
  margin: 20px;
  position: sticky;
  top: 20px;
`;

export const Top = styled.div`
  border: 1px solid rgb(47, 51, 54);
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const Bottom = styled.div`
  border: 1px solid rgb(47, 51, 54);
  border-radius: 10px;
  width: 90%;
  margin: 20px auto 0;
  gap: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const SideTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const More = styled.button`
  background-color: transparent;
  color: #70767B;
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    color: #FFFFFF;
  }
`;

export const SubName = styled.span`
  font-size: 12px;
  color: #70767B;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;


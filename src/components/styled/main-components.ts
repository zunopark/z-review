import styled from "styled-components";

export const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const MainContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  border-left: 1px solid #70767B;
  border-right: 1px solid #70767B;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const Sidebar = styled.div`
  height: 90vh;
  width: 35%;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  gap: 20px;
  margin-top: 30px;
`;

export const Top = styled.div`
  border: 1px solid #70767B;
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
`;

export const Center = styled.div`
  border: 1px solid #70767B;
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
`;

export const Bottom = styled.div`
  border: 1px solid #70767B;
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
import styled from "styled-components";
import { Link } from "react-router-dom";
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 230px) 1fr; 
  padding: 0px;
  width: 100%;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  height: 100vh;
  position: sticky;
  top: 0;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const MenuItem = styled.div<{ $isActive?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 50px;
  transition: background-color 0.2s ease;
  width: fit-content;
  color: white;
  font-weight: ${props => props.$isActive ? '700' : '350'};
  font-size: 20px;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }


  svg {
    width: 26px;
    height: 26px;
    stroke-width: ${props => props.$isActive ? '2.5' : '1.5'};
    stroke: white;
  }
`;

export const Logo = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PostButton = styled.button`
  background-color: #D7DBDC;
  color: black;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 90%;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;


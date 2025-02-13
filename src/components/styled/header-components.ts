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
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  height: 100vh;
  position: sticky;
  top: 0;
  border-right: 1px solid #70767B;
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
  font-weight: ${props => props.$isActive ? '700' : '400'};
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
import styled from "styled-components";

export const CategorySearchBar = styled.div`
  margin-bottom: 10px;
`;

export const CategorySearchBarInput = styled.input`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  padding: 10px 16px;
  
  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
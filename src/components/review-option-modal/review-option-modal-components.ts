import styled from 'styled-components';

export const ThreeDots = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  svg {
    width: 24px;
    height: 24px;
    stroke: #6b7280;
  }
`;

export const OptionModal = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #000000;
  border: 1px solid #6b7280;
  border-radius: 4px;
  padding: 8px;
  z-index: 1000;
`;

export const OptionItem = styled.div`
  padding: 8px;
  cursor: pointer;
  width: max-content;
  &:hover {
    background-color: #6b7280;
  }
`;

import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  color: black;
`;

export const ModalContent = styled.div`
  background: #D7DBDC;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  max-width: 500px;
  position: relative;
`;

export const ModalMessage = styled.div`
  margin: 20px 0;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalConfirm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ModalConfirmButton = styled.button<{ backgroundColor: string, color: string, border: string }>`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  border: ${props => props.border};
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  width: 100%;
`;


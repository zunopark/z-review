import styled from "styled-components";
import { Form } from "react-router-dom";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;


export const StyledForm = styled(Form)`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  border: noen;
  border-radius: 50px;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Title = styled.h1`
  font-size: 42px;
  font-weight: 600;

`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;

`;

export const Switcher = styled.span`
  margin-top: 20px;

  a {
    color: #1d4ed8;
  }
`;
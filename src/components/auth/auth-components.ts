import styled from 'styled-components';
import { Form } from 'react-router-dom';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LeftTitle = styled.h1`
  font-size: clamp(100px, 10vw, 230px);
  font-weight: 600;
  margin-bottom: 20px;
`;

export const LeftSubTitle = styled.h2`
  font-size: 26px;
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vh;
  padding: 50px 0px;
  justify-content: center;
  padding: 20px;
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
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Title = styled.h1`
  font-size: 36px;
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

export const SocialButton = styled.button`
  background-color: white;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
  width: 100%;
  color: black;
  margin-top: 20px;
`;

export const SocialLogo = styled.img`
  height: 25px;
`;

export const SocialLoginContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

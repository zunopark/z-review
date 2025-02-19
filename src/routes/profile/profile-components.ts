import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarUpload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const AvatarImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const AvatarInput = styled.input`
  display: none;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserHandle = styled.div`
  font-size: 16px;
  color: #6b7280;
`;

export const UserNameInput = styled.input`
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  padding: 4px 8px;
  background: transparent;
  color: white;
  margin-bottom: 10px;
  
  &:focus {
    border-bottom-color: #007bff;
  }
`;

export const UserName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  padding: 4px 8px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
`;

export const UserReviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

export const NoReview = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
  font-weight: 550;
`;
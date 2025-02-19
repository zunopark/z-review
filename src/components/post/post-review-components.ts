import styled from "styled-components";

export const Wrapper = styled.div`
`;

export const Form = styled.form`
  border: 1px solid rgb(47, 51, 54);
  border-radius: 16px;
  margin: 16px 0;
`;

export const PostContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
`;

export const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const ContentContainer = styled.div`
  width: 100%;
`;

export const Textarea = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  font-size: 16px;
  padding: 12px 0;
  outline: none;
  background-color: transparent;
  color: white;
  
  &::placeholder {
    color: rgb(83, 100, 113);
  }
`;

export const ImagePreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  margin-top: 12px;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid rgb(239, 243, 244);
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  border-top: 1px solid rgb(47, 51, 54);
  padding-top: 12px;
`;

export const AttachFileButton = styled.label`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const AttachFileInput = styled.input`
  display: none;
`;

export const SubmitButton = styled.input<{ $hasText: boolean }>`
  background-color: #D7DBDC;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  color: black;
  font-weight: 600;
  cursor: ${props => props.$hasText ? 'pointer' : 'default'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.$hasText ? '#1a8cd8' : '#8ecdf8'};
  }
`;

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 150px));
  gap: 15px;
  padding: 10px;
`;

export const Category = styled.div`
  padding: 8px 12px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
`;

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RatingStarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StarButton = styled.button<{ $isSelected: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${props => props.$isSelected ? '#FFD700' : '#E0E0E0'};
  font-size: 24px;
  transition: color 0.2s, transform 0.1s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const CategoryName = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

export const BackButton = styled.span`
    cursor: pointer;

    svg {
        width: 24px;
        height: 24px;
    }
`;

export const SearchResultContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  padding: 10px;
`;

export const SearchResultItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const SearchResultImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

export const SearchResultTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RatingTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const RaitingInfoContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const RatingResult = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const MovieInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgb(47, 51, 54);
  padding-bottom: 12px;
`;

export const MovieInfoImage = styled.img`
  width: 150px;
  height: 200px;
  object-fit: cover;
`;

export const MovieInfoTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

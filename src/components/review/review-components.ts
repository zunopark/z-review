import styled from "styled-components";

export const ReviewContainer = styled.div`
  border: 1px solid rgb(47, 51, 54);
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: #d1d5db;
  flex-shrink: 0;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: max-content;
`;

export const UserName = styled.span`
  font-weight: bold;
`;

export const UserHandle = styled.span`
  color: #6b7280;
`;

export const Dot = styled.span`
  color: #6b7280;
`;

export const TimeStamp = styled.span`
  color: #6b7280;
`;

export const ReviewText = styled.p`
  margin-top: 0.5rem;
`;

export const InteractionButtons = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 0.75rem;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  
  svg {
    width: 24px;
    height: 24px;
    stroke: #6b7280;
  }

  &:hover {
    color: #333;
    svg {
      stroke: #333;
    }
  }
`;

export const Badge = styled.span`
  background-color: #6b7280;
  color: #000;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 8px;
  cursor: pointer;
`;

export const UserLevel = styled.span`
  color: white;
  font-size: 12px;
  margin-left: 8px;
`;

export const ReviewedContent = styled.div`
  margin: 12px 0;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const ProductName = styled.span`
  font-weight: 600;
  font-size: 18px;
  margin-right: 5px;
`;

export const RatingStars = styled.div`
  display: flex;
  gap: 2px;
`;

export const Star = styled.span<{ $filled: boolean }>`
  color: ${props => props.$filled ? '#ffc107' : '#e4e5e9'};
`;

export const ReviewImages = styled.div`
  margin: 12px 0;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  margin-top: 8px;
`;

export const ReviewImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

export interface IReview {
  id?: string; // unique id of review
  text: string;
  rating: number;
  createdAt: number;
  username: string;
  userId: string; // unique id of user
  fileUrls: string[];
  content: string;
  category: string;
}
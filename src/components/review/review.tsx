import { formatRelativeTime } from '../../util';
import {
  ReviewContainer,
  FlexRow,
  Avatar,
  Content,
  Header,
  UserName,
  UserHandle,
  Dot,
  TimeStamp,
  ReviewText,
  InteractionButtons,
  Button,
  Badge,
  UserLevel,
  ReviewedContent,
  ProductInfo,
  ProductName,
  RatingStars,
  Star,
  ReviewImages,
  ImageGrid,
  ReviewImage,
  UserInfoContainer,
  RatingResultContainer,
  RatingInfoContainer,
  RatingInfo,
} from './review-components';
import ReviewOptions from '../review-option-modal/review-option-modal';
import { IReview } from '../../store/review/useReviewStore';
import { useBookmarkStore } from '../../store/bookmark/useBookmarkStore';
import { useState } from 'react';

export default function Review({ review }: { review: IReview }) {
  const { addBookmark } = useBookmarkStore();
  const [localBookmarkCount, setLocalBookmarkCount] = useState(
    review.totalBookmarks || 0,
  );

  const handleBookmarkClick = (review: IReview) => {
    addBookmark(review.userId, review);
    setLocalBookmarkCount((prev) => prev + 1);
  };

  return (
    <ReviewContainer>
      <FlexRow>
        <Avatar
          src={review.userProfileImageUrl || '/default.png'}
          alt={`${review.userName}'s profile`}
        />
        <Content>
          <Header>
            <UserInfoContainer>
              <UserName>{review.userName}</UserName>
              <UserHandle>@{review.userName}</UserHandle>
              <Dot>·</Dot>
              <TimeStamp>{formatRelativeTime(review.createdAt)}</TimeStamp>
              <Badge>{review.category}</Badge>
              <UserLevel>Lv.1</UserLevel>
            </UserInfoContainer>
            <ReviewOptions reviewId={review.id || ''} userId={review.userId} />
          </Header>

          <ReviewedContent>
            <ProductInfo>
              <ProductName>{review.contentName}</ProductName>
              <RatingResultContainer>
                <RatingInfoContainer>
                  <RatingInfo>개연성 {review.storyRating}</RatingInfo>
                  <RatingInfo>캐릭터 {review.characterRating}</RatingInfo>
                  <RatingInfo>기술 {review.technicalRating}</RatingInfo>
                  <RatingInfo>테마 {review.themeRating}</RatingInfo>
                  <RatingInfo>추천도 {review.recommendationRating}</RatingInfo>
                </RatingInfoContainer>
                <RatingStars>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      $filled={
                        star <=
                        (review.storyRating +
                          review.characterRating +
                          review.technicalRating +
                          review.themeRating +
                          review.recommendationRating) /
                          5
                      }
                    >
                      ★
                    </Star>
                  ))}
                </RatingStars>
              </RatingResultContainer>
            </ProductInfo>
          </ReviewedContent>

          <ReviewText>{review.userDescription}</ReviewText>

          <ReviewImages>
            <ImageGrid>
              {review.fileUrls.length > 0 &&
                review.fileUrls.map((image, index) => (
                  <ReviewImage
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                  />
                ))}
            </ImageGrid>
          </ReviewImages>

          <InteractionButtons>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                />
              </svg>
              <span>{review.totalComments}</span>
            </Button>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
              <span>{review.totalLikes}</span>
            </Button>
            <Button onClick={() => handleBookmarkClick(review)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
              <span>{localBookmarkCount}</span>
            </Button>
          </InteractionButtons>
        </Content>
      </FlexRow>
    </ReviewContainer>
  );
}

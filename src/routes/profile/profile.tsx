import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { useReviewStore } from '../../store/review/useReviewStore';
import Review from '../../components/review/review';
import {
  ProfileContainer,
  AvatarUpload,
  AvatarImage,
  AvatarInput,
  UserInfo,
  UserHandle,
  UserName,
  UserNameInput,
  UserReviews,
  NoReview,
} from './profile-components';

export default function Profile() {
  const user = auth.currentUser;
  const [avatarUrl, setAvatarUrl] = useState(user?.photoURL ?? '');
  const [userName, setUserName] = useState(user?.displayName ?? '');
  const [isEditing, setIsEditing] = useState(false);
  const { userReviews, getUserReviews, updateUserReviewsName } =
    useReviewStore();

  useEffect(() => {
    if (user) {
      getUserReviews(user?.uid);
    }
  }, [user?.uid]);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    if (fileList.length === 1) {
      const newFile = fileList[0];

      if (newFile.size > 1024 * 1024) {
        alert('파일 크기는 1MB 이하여야 합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const newAvatarUrl = reader.result as string;
        setAvatarUrl(newAvatarUrl); // Update state
        try {
          await updateProfile(user, {
            photoURL: newAvatarUrl, // Use the new URL directly
          });
        } catch (error) {
          console.error('Error updating profile:', error);
          alert('프로필 업데이트에 실패했습니다.');
        }
      };
      reader.readAsDataURL(newFile);
    } else {
      alert('최대 1개의 이미지만 업로드할 수 있습니다.');
    }
  };

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameSubmit = async () => {
    try {
      if (auth.currentUser) {
        // Update profile
        await updateProfile(auth.currentUser, {
          displayName: userName,
        });

        // Update all reviews for this user with the new username
        if (userReviews.length > 0) {
          const batch = await updateUserReviewsName(
            auth.currentUser.uid,
            userName,
          );
          if (batch) {
            console.log('Successfully updated username in all reviews');
          }
        }

        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setUserName(userName || '익명의 사용자');
    }
  };

  const handleOnchangeUserName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUserName(event.target.value);
  };

  return (
    <ProfileContainer>
      <AvatarUpload htmlFor="avatar-input">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        type="file"
        id="avatar-input"
        onChange={onFileChange}
        accept="image/*"
      />
      <UserInfo>
        {isEditing ? (
          <UserNameInput
            value={userName}
            onChange={handleOnchangeUserName}
            onBlur={handleNameSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <UserName onClick={handleNameClick}>
            {userName ?? '익명의 사용자'}
          </UserName>
        )}
        <UserHandle>{user?.email ?? '@익명의 사용자'}</UserHandle>
      </UserInfo>
      <UserReviews>
        {userReviews.length > 0 ? (
          userReviews.map((review) => (
            <Review key={review.id} review={review} />
          ))
        ) : (
          <NoReview>작성한 리뷰가 없네요! 리뷰 작성하러 가볼까요?</NoReview>
        )}
      </UserReviews>
    </ProfileContainer>
  );
}

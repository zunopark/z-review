import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useReviewStore } from "../store/review/useReviewStore";
import Review from "../components/review/review";
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarUpload = styled.label`
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

const AvatarImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const AvatarInput = styled.input`
  display: none;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserHandle = styled.div`
  font-size: 16px;
  color: #6b7280;
`;

const UserNameInput = styled.input`
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

const UserName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  padding: 4px 8px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
`;

const UserReviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatarUrl, setAvatarUrl] = useState(user?.photoURL ?? "");
  const [userName, setUserName] = useState(user?.displayName ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const { userReviews, getUserReviews } = useReviewStore();

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
      setAvatarUrl(URL.createObjectURL(newFile));
      await updateProfile(user, {
        photoURL: avatarUrl
      });
    } else {
      alert("최대 1개의 이미지만 업로드할 수 있습니다.");
    }
  }

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameSubmit = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userName
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setUserName(userName || "익명의 사용자");
    }
  };

  const handleOnchangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }
    
  return (
    <ProfileContainer>
      <AvatarUpload htmlFor="avatar-input">
        {avatarUrl ? <AvatarImage src={avatarUrl} /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>}
      </AvatarUpload>
      <AvatarInput type="file" id="avatar-input" onChange={onFileChange} accept="image/*" />
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
          {userName ?? "익명의 사용자"}
        </UserName>
      )}
        <UserHandle>{user?.email ?? "@익명의 사용자"}</UserHandle>
      </UserInfo>
      <UserReviews>
        {userReviews.length > 0 ? (
          userReviews.map((review) => (
            <Review key={review.id} review={review} />
          ))
        ) : (
          <div>작성한 리뷰가 없네요! 리뷰 작성하러 가볼까요?</div>
        )}
      </UserReviews>
    </ProfileContainer>
  )
}

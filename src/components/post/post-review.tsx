import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase";
import {
  Form,
  PostContainer,
  ProfileImage,
  ContentContainer,
  Textarea,
  ImagePreviewContainer,
  PreviewImage,
  ActionBar,
  AttachFileButton,
  AttachFileInput,
  SubmitButton,
  CategoryContainer,
  Category,
  Wrapper,
  CategorySearchBar,
  CategorySearchBarInput,
  CategorySearchBarButton,
  RatingContainer,
  RatingStarContainer,
  StarButton,
} from "./post-review-components";

export default function PostReview() {
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState("");
    const [file, setFile] = useState<string | null>(null);
    const [isCategorySearchBarOpen, setIsCategorySearchBarOpen] = useState(false);
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        
        if (files && files.length === 1 && files[0].size < 1024 * 1024) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setFile(reader.result as string);
            }

            reader.readAsDataURL(files[0]);
        }
    }

    const handleRatingClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const StarIcon = ({ filled }: { filled: boolean }) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={filled ? "#FFD700" : "none"}
            stroke={filled ? "#FFD700" : "#E0E0E0"}
            strokeWidth="2"
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || text === "" || text.length > 180 || rating === 0) return;
        
        try {
            setIsLoading(true);
            const reviewRef = collection(db, "reviews");
            const docRef = await addDoc(reviewRef, {
                text,
                rating,
                createdAt: Date.now(),
                username: user.displayName || "익명의 사용자",
                userId: user.uid,
                fileUrl: file,
            });
            setText("");
            setFile(null);
            setRating(0);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const openCategorySearchBar = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsCategorySearchBarOpen(true);
        setCategory(event.currentTarget.textContent || "");
    }

  return (
    <Wrapper>
        <CategoryContainer>
            {["영화", "애니", "미드", "한드", "게임"].map((_, index) => (
                <Category onClick={openCategorySearchBar} key={index}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
              </svg>{_}</Category>
            ))}
        </CategoryContainer>
        {isCategorySearchBarOpen && (
            <CategorySearchBar>
                <CategorySearchBarInput type="text" placeholder={`${category} 검색`} />
            </CategorySearchBar>
        )}
        <RatingContainer>
            <RatingStarContainer>
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarButton
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        isSelected={star <= rating}
                        type="button"
                        aria-label={`Rate ${star} stars`}
                    >
                        <StarIcon filled={star <= rating} />
                    </StarButton>
                ))}
            </RatingStarContainer>
            {rating > 0 && (
                <span style={{ color: '#536471', fontSize: '14px' }}>
                    {rating}/5
                </span>
            )}
        </RatingContainer>
        <Form onSubmit={onSubmit}>
            <PostContainer>
                <ProfileImage 
                    src={auth.currentUser?.photoURL ?? "/default-avatar.png"} 
                    alt="profile" 
                />
                <ContentContainer>
                    <Textarea 
                        rows={5} 
                        maxLength={180} 
                        placeholder="어떤 리뷰를 작성해볼까요?" 
                        value={text} 
                        onChange={onChange} 
                        required 
                    />
                    {file && (
                        <ImagePreviewContainer>
                            <PreviewImage src={file} alt="attached" />
                        </ImagePreviewContainer>
                    )}
                    <ActionBar>
                        <AttachFileButton htmlFor="file">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0">
                                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086z" />
                            </svg>
                        </AttachFileButton>
                        <SubmitButton 
                            type="submit" 
                            value={isLoading ? "작성중" : "리뷰 작성하기"} 
                            hasText={text.length > 0}
                        />
                    </ActionBar>
                </ContentContainer>
            </PostContainer>
            <AttachFileInput 
                type="file" 
                id="file" 
                accept="image/*" 
                onChange={onFileChange} 
            />
        </Form>
    </Wrapper>
  );
}
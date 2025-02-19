import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "../../firebase";
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
  RatingContainer,
  RatingStarContainer,
  StarButton,
  CategoryName,
  CategoryImage,
  BackButton,
  SearchResultContainer,
  SearchResultItem,
  SearchResultImage,
  SearchResultTitle,
} from "./post-review-components";
import { useNavigate } from "react-router-dom";
import { useReviewStore } from "../../store/review/useReviewStore";
import { useCategoryStore } from "../../store/review/useCategoryStore";
import { Search } from "../search/search";
import { useSearchStore } from "../../store/review/useSearchStore";

export default function PostReview() {
    const { postReviewToFirebase } = useReviewStore();
    const { getCategory, categoryListData } = useCategoryStore();
    const { searchMovieListData, resetSearchMovieListData } = useSearchStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState("");
    const [files, setFiles] = useState<string[]>([]);
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const [step, setStep] = useState(1);

    useEffect(() => {
        getCategory();

        // 컴포넌트가 언마운트될 때 검색 결과 초기화
        return () => {
            resetSearchMovieListData();
        }
    }, []);

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        
        if (!fileList) return;

        const newFiles = Array.from(fileList);
        
        if (files.length + newFiles.length > 2) {
            alert('최대 2개의 이미지만 업로드할 수 있습니다.');
            return;
        }

        newFiles.forEach(file => {
            if (file.size > 1024 * 1024) {
                alert('파일 크기는 1MB 이하여야 합니다.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFiles(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    }

    const removeImage = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }

    const handleRatingClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const StarIcon = ({ $filled }: { $filled: boolean }) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={$filled ? "#FFD700" : "none"}
            stroke={$filled ? "#FFD700" : "#E0E0E0"}
            strokeWidth="2"
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );

    const resetForm = () => {
        setText("");
        setFiles([]);
        setRating(0);
        setCategory("");
        setContent("");
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || text === "" || text.length > 180 || rating === 0) return;
        
        try {
            setIsLoading(true);
            const params = {
                text,
                rating,
                createdAt: Date.now(),
                userName: user.displayName || "익명의 사용자",
                userId: user.uid,
                fileUrls: files,
                content : content,
                category : category
            }
            const reviewId = await postReviewToFirebase(params);
            resetForm();
            navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const openCategorySearchBar = (event: React.MouseEvent<HTMLDivElement>) => {
        setCategory(event.currentTarget.textContent || "");
        setStep(2);
    }

    const handleMovieClick = (movie: any) => {
        // 여기 근데 영어로 나오는것 어떻게 저장할지 고민 필요
        // 어떤 언어든 간에 id 가 있으니 데이터베이스에는 그걸로 저장하면 될듯 유니크 값으로 저장하기
        // 영화진흥원 데이터를 사용해야할수도 있음
        setContent(movie);
        setStep(3);
    }

  return (
    <Wrapper>
        {step === 1 && <CategoryContainer>
            {categoryListData?.map((category, index) => (
                <Category onClick={openCategorySearchBar} key={index}>
                    <CategoryImage src={`/category/movie.jpg`} alt={category.name} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
            ))}
        </CategoryContainer>}

        {step === 2 && (
            <>
                <Search />
                <SearchResultContainer>
                    {searchMovieListData?.map((movie) => (
                        <SearchResultItem key={movie.id} onClick={() => handleMovieClick(movie)}>
                            <SearchResultImage src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt={movie.title} />
                            <SearchResultTitle>{movie.original_title}</SearchResultTitle>
                        </SearchResultItem>
                    ))}
                </SearchResultContainer>
                <BackButton onClick={() => setStep(1)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg></BackButton>
            </>
        )}

        {step === 3 && (
            <>
                <RatingContainer>
                <RatingStarContainer>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <StarButton
                            key={star}
                            onClick={() => handleRatingClick(star)}
                            $isSelected={star <= rating}
                            type="button"
                            aria-label={`Rate ${star} stars`}
                        >
                            <StarIcon $filled={star <= rating} />
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
                        {files.length > 0 && (
                            <ImagePreviewContainer>
                                {files.map((file, index) => (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <PreviewImage src={file} alt={`attached-${index}`} />
                                        <button
                                            onClick={() => removeImage(index)}
                                            style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                background: 'rgba(0, 0, 0, 0.5)',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '24px',
                                                height: '24px',
                                                cursor: 'pointer',
                                                color: 'white'
                                            }}
                                            type="button"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
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
                                value={isLoading ? "게시 중..." : "게시하기"} 
                                $hasText={text.length > 0}
                            />
                        </ActionBar>
                    </ContentContainer>
                </PostContainer>
                <AttachFileInput 
                    type="file" 
                    id="file" 
                    accept="image/*" 
                    onChange={onFileChange}
                    multiple
                />
                </Form>
                <BackButton onClick={() => setStep(2)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg></BackButton>
            </>
        )}
    </Wrapper>
  );
}
import { Search } from '../components/search/search';
import {
  SearchResultContainer,
  SearchResultImage,
  SearchResultItem,
  SearchResultTitle,
} from '../components/post/post-review-components';
import { useSearchStore } from '../store/search/useSearchStore';
import { useState } from 'react';

export default function SearchPage() {
  const { searchedListData } = useSearchStore();
  const [content, setContent] = useState<any>(null);

  const handleContentClick = (content: any) => {
    setContent(content);
  };

  return (
    <>
      <Search category={'리뷰가 궁금한 컨텐츠'} />
      <SearchResultContainer>
        {searchedListData?.length > 0 ? (
          searchedListData.map((content) => (
            <SearchResultItem
              key={content.id}
              onClick={() => handleContentClick(content)}
            >
              <SearchResultImage
                src={`https://image.tmdb.org/t/p/w92/${content.poster_path}`}
                alt={content.original_title || content.original_name}
              />
              <SearchResultTitle>
                {content.original_title || content.original_name}
              </SearchResultTitle>
            </SearchResultItem>
          ))
        ) : (
          <SearchResultTitle>검색 결과가 없습니다.</SearchResultTitle>
        )}
      </SearchResultContainer>
    </>
  );
}

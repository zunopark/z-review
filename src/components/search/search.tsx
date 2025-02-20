import { useEffect, useState } from "react";
import { CategorySearchBar, CategorySearchBarInput } from "./search-component";
import { useSearchStore } from "../../store/review/useSearchStore";

interface ISearchResult {
    id: string;
    title: string;
}

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export const Search = ({ category }: { category: string }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { getMovie, getMusic, getAnime, getTvShow } = useSearchStore();

    const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsLoading(true);
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        if (debouncedSearchTerm.trim()) {
            if (category === "영화") {
                getMovie(debouncedSearchTerm);
            } else if (category === "음악") {
                // getMusic(debouncedSearchTerm);
                alert("음악 검색 기능은 아직 준비중입니다.");
            } else if (category === "애니") {
                getAnime(debouncedSearchTerm);
            } else if (category === "TV쇼") {
                getTvShow(debouncedSearchTerm);
            }
        }
        setIsLoading(false);
    }, [debouncedSearchTerm]);

    return (
        <>
            <CategorySearchBar>
                <CategorySearchBarInput 
                    onChange={onContentChange}
                    value={searchTerm}
                    type="text" 
                    placeholder={isLoading ? `${category} 검색중...` : `${category}를 검색해주세요!`} 
                />
            </CategorySearchBar>
        </>
    );
};
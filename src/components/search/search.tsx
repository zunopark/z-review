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

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { getMovie } = useSearchStore();

    const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsLoading(true);
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        if (debouncedSearchTerm.trim()) {
            getMovie(debouncedSearchTerm);
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
                    placeholder={isLoading ? '영화 검색중...' : '영화를 검색해주세요!'} 
                />
            </CategorySearchBar>
        </>
    );
};
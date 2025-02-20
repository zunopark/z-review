import { BookmarkContainer, BookmarkTitle } from "./bookmark-components";
import { useBookmarkStore } from "../../store/bookmark/useBookmarkStore";
import Review from "../../components/review/review";

export default function Bookmark() {
  const { bookmarks } = useBookmarkStore();

  return (
    <BookmarkContainer>
      <BookmarkTitle>북마크</BookmarkTitle>
      {bookmarks.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </BookmarkContainer>
  )
}

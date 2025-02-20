import { BookmarkContainer, BookmarkTitle } from './bookmark-components';
import { useBookmarkStore } from '../../store/bookmark/useBookmarkStore';
import Review from '../../components/review/review';
import { useEffect } from 'react';
import { auth } from '../../firebase';

export default function Bookmark() {
  const { bookmarks, getBookmarks } = useBookmarkStore();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      getBookmarks(user.uid);
    }
  }, []);

  return (
    <BookmarkContainer>
      <BookmarkTitle>북마크</BookmarkTitle>
      {bookmarks.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </BookmarkContainer>
  );
}

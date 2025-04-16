import PostCard from '../components/hoyoung/CommunityPostCard';
import styles from './CommunityPage.module.scss';
import { posts } from '../assets/community-dummy-data';
import { useSearchParams } from 'react-router-dom';
import SideMenu from '../components/hoyoung/SideMenu';
import SearchBar from '../components/hajoon/SearchBar';
import AuthProvider from '../components/hajoon/context/Location.jsx';
import NoSearchResult from '../components/hoyoung/NoSearchResult';

const CommunityPage = () => {
  // ?뒤에 값(쿼리스트링) 읽는법
  // useSearchParams은 배열을 리턴하는데
  // 0번인덱스에는 쿼리스트링을 모아놓은 객체를 리턴
  // 1번인덱스는 쿼리스트링을 생성할 수 있는 함수를 리턴
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') || 'all';
  const hot = searchParams.get('hot') || 'none';

  // 옵셔널 체이닝 (?.): 값이 존재하면 적용, 존재하지 않으면 실행하지 않음.
  const search = searchParams.get('search')?.toLowerCase() || '';

  const categorys = [...new Set(posts.map((post) => post.category))];
  let filteredpost = posts
    .filter((post) => category === 'all' || post.category === category)
    .filter(
      (post) =>
        post.title.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search),
    );
  if (hot == 'hot') {
    filteredpost = filteredpost.sort((a, b) => b.likes - a.likes);
  }
  return (
    <div>
      <AuthProvider>
        <SearchBar className={styles.searchbar} />
      </AuthProvider>
      <div className={styles.breadcrumb}>
        <span>홈</span>&nbsp;&gt;&nbsp;
        <span>동네생활</span>
        <h1>서울특별시 서초구 서초동 동네생활</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.sideMenu}>
          <SideMenu categorys={categorys} />
        </div>
        <div className={styles.blog}>
          <div>
            {filteredpost.length == 0 && <NoSearchResult />}
            {filteredpost.length > 0 &&
              filteredpost.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;

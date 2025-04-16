import React, { useEffect, useState } from 'react';
import styles from './CommunityPageDetail.module.scss';
import { useParams } from 'react-router-dom';
import { posts } from '../assets/community-dummy-data';
import { users } from '../assets/community-dummy-user';
import { comments } from '../assets/community-dummy-comment';
import UserProfile from '../components/hoyoung/UserProfile';
import ThumbButton from '../components/hoyoung/ThumbButton';
import CommentButton from '../components/hoyoung/CommentButton';
import BookMarkButton from '../components/hoyoung/BookMarkButton';
import SideMenu from '../components/hoyoung/SideMenu';
import CommentSpace from '../components/hoyoung/CommentSpace';
import EmptyComment from '../components/hoyoung/EmptyComment';
import HotTopic from '../components/hoyoung/HotTopic';
import DownloadBanner from '../components/hoyoung/DownloadBanner';

import QrCodeModal from '../components/modal/QrCodeModal';

const CommunityPageDetail = () => {
  // 모달 상태 관리
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  // 모달 열기 함수
  const openQrModal = () => {
    setIsQrModalOpen(true);
  };
  // 모달 닫기 함수
  const closeQrModal = () => {
    setIsQrModalOpen(false);
  };

  // 지금 상세보기 페이지의 postId값을 URL로부터 읽어와야 한다.
  // 라우터 설정에 지정한 이름으로 글 번호를 얻어올 수 있다.
  const { postId } = useParams();

  const foundPost = posts.find((p) => p.id === +postId);
  const foundUser = users.find((u) => u.id === foundPost.user_id);
  const foundComments = comments
    .filter((c) => c.parent_id === +postId)
    .sort((a, b) => new Date(a.realDate) - new Date(b.realDate));

  const post = {
    ...foundPost,
  };
  const views = post.views.toLocaleString();

  const [sortComments, setComments] = useState(foundComments);
  const [sort, setSort] = useState('registered');
  useEffect(() => {
    const updated = comments
      .filter((c) => c.parent_id === +postId)
      .sort((a, b) => new Date(a.realDate) - new Date(b.realDate));

    setComments(updated);
    setSort('registered'); // 선택적으로 정렬 상태도 초기화
  }, [postId]);

  const clickSortHandler = (status) => {
    setSort(status);
    if (status === 'registered') {
      setComments(
        [...sortComments].sort(
          (a, b) => new Date(a.realDate) - new Date(b.realDate),
        ),
      );
    } else {
      setComments(
        [...sortComments].sort(
          (a, b) => new Date(b.realDate) - new Date(a.realDate),
        ),
      );
    }
  };
  const categorys = [...new Set(posts.map((post) => post.category))];
  return (
    <>
      <div className={styles.breadcrumb}>
        <span>홈</span>&nbsp;&gt;&nbsp;
        <span>동네생활</span>&nbsp;&gt;&nbsp;
        <span>{post.category}</span>
      </div>
      <div className={styles.container}>
        <div className={styles.sideMenu}>
          <SideMenu categorys={categorys} />
        </div>
        <article className={styles.post}>
          <span className={styles.badge}>{post.category}</span>
          <UserProfile post={post} user={foundUser} />
          <h1>{post.title}</h1>
          <p>{post.content}</p>

          {post.images.map((image) => (
            <div key={Math.random()} className={styles.imageWrapper}>
              <img src={image} />
            </div>
          ))}
          <div className={styles.meta}>
            <img
              src='https://assetstorage.krrt.io/1143366661080869398/6c774f35-3eef-44d7-8668-b6ed67e27b97/width=120,height=120.png'
              alt='공감버튼'
            />
            <span>이웃들이 공감했어요</span>
          </div>
          <div className={styles.content}>
            <div className={styles.iconRow}>
              <span className={styles.iconGroup} onClick={openQrModal}>
                <ThumbButton />
                {post.likes}
              </span>
              {isQrModalOpen && <QrCodeModal onClose={closeQrModal} />}{' '}
              <span className={styles.iconGroup}>
                <CommentButton />
                {sortComments.length}
              </span>
              <span className={styles.iconGroup}>
                <BookMarkButton /> {post.bookmarks}
              </span>
              <span className={styles.view}>조회 {views}</span>
            </div>
          </div>

          <div className={styles.comments}>
            <div className={styles.sortTab}>
              <button
                className={`${styles.tab} ${sort === 'registered' ? styles.active : ''}`}
                onClick={() => clickSortHandler('registered')}
              >
                등록순
              </button>
              <button
                className={`${styles.tab} ${sort === 'latest' ? styles.active : ''}`}
                onClick={() => clickSortHandler('latest')}
              >
                최신순
              </button>
            </div>
            {sortComments.length == 0 && <EmptyComment />}
            {sortComments.length > 0 &&
              sortComments.map((comment) => {
                const commentUser = users.find((u) => u.id === comment.user_id);
                return (
                  <CommentSpace
                    key={Math.random()}
                    comment={comment}
                    user={commentUser}
                  />
                );
              })}
          </div>
          <HotTopic posts={posts} location={foundUser.location} />
        </article>
      </div>
      <div>
        <DownloadBanner />
      </div>
    </>
  );
};

export default CommunityPageDetail;

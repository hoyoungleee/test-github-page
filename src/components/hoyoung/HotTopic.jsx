import React from 'react';
import styles from './HotTopic.module.scss';
import PostCard from './HotTopicPostCard';

const HotTopic = ({ posts, location }) => {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>{location} 인기글</h2>
        <button className={styles.more}>더보기 &gt;</button>
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default HotTopic;

import React from 'react';
import styles from './CommentSpace.module.scss';
import UserProfile from './UserProfile';
import ThumbButton from './ThumbButton';

const ReplySpace = ({ comment, user }) => {
  return (
    <div key={comment.id} className={styles.comment}>
      <UserProfile post={comment} user={user} />
      <p>{comment.content}</p>
      <div className={styles.info}>
        <span>
          <ThumbButton />
        </span>
        &nbsp;
        {comment.likes}
        &nbsp; &nbsp;
      </div>
    </div>
  );
};

export default ReplySpace;

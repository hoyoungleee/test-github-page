import React from 'react';
import styles from './CommentSpace.module.scss';
import UserProfile from './UserProfile';
import ThumbButton from './ThumbButton';
import CommentButton from './CommentButton';
import { replies } from '../../assets/community-dummy-childComment.js';
import ReplySpace from './ReplySpace.jsx';
import { users } from '../../assets/community-dummy-user';

const CommentSpace = ({ comment, user }) => {
  const childComment = replies.filter((cc) => cc.parent_id == comment.id);

  return (
    <>
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
          <span>
            <CommentButton />
          </span>
          &nbsp;
          {childComment.length}
        </div>
      </div>
      <div className={styles.reply}>
        {childComment.map((cc) => {
          const replytUser = users.find((u) => u.id === cc.user_id);
          return (
            <ReplySpace key={Math.random()} comment={cc} user={replytUser} />
          );
        })}
      </div>
    </>
  );
};

export default CommentSpace;

import React from 'react';

import Header from './Header';
import MediaView from './MediaView';
import Footer from './Footer';

const PostView = ({post, handleLikeClick, insertReply, deleteReply, getAllReplies, setPostIndex, session}) => {
    return (
      <div>
        {post.posts.map((contact, i) => {
          return(
            <article className="postview_wrapper postview_bt60px" key={i}>
              <Header post={contact}/>
              {contact.media.length > 0 &&
              <MediaView post={contact}/>
              }
              <Footer
                post={contact}
                likeload={post.index===i && post.status.like?true:false}
                replyload={post.index===i && post.status.reply?true:false}
                index={i}
                handleLikeClick={handleLikeClick}
                setPostIndex={setPostIndex}
                insertReply={insertReply}
                deleteReply={deleteReply}
                getAllReplies={getAllReplies}
                session={session}
              />
            </article>
          );
        })}
      </div>
    )
}

export default PostView;

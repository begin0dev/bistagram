import React from 'react';

import Header from './Header';
import MediaView from './MediaView';
import Footer from './Footer';

const PostView = ({post, auth, handleLikeClick, insertReply, setPostReply,
                  deleteReply, getAllReplies, setPostIndex,
                  handleModal, setMediaIndex, setMediaPlay}) => {
    return (
      <div>
        {post.posts.map((contact, i) => {
          return(
            <article className="postview_wrapper postview_bt60px" key={i}>

              <Header post={contact}/>

              {contact.media.length > 0 &&
              <MediaView
                post={contact}
                atcindex={i}
                setMediaIndex={setMediaIndex}
                setMediaPlay={setMediaPlay}
              />
              }

              <Footer
                post={contact}
                auth={auth}
                likeload={post.index===i && post.status.like?true:false}
                replyload={post.index===i && post.status.reply?true:false}
                index={i}
                handleLikeClick={handleLikeClick}
                setPostIndex={setPostIndex}
                setPostReply={setPostReply}
                insertReply={insertReply}
                deleteReply={deleteReply}
                getAllReplies={getAllReplies}
                handleModal={handleModal}
              />

            </article>
          );
        })}
      </div>
    )
}

export default PostView;

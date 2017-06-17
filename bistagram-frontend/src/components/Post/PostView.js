import React from 'react';

import Header from './Header';
import MediaView from './MediaView';
import Reply from './Reply';

const PostView = ({post}) => {
    return (
      <div>
        {post.posts.map((contact, i) => {
          return(
            <article className="postview_wrapper postview_bt60px" key={i}>
              <Header post={contact}/>
              {contact.media.length > 0 &&
              <MediaView post={contact}/>
              }
            </article>
          );
        })}
      </div>
    )
}

export default PostView;

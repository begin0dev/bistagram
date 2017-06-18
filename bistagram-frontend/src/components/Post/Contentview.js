import React from 'react';

const Contentview = ({post}) => {
    return (
      <ul className="reply_ul_mgpd">
        <li className="reply_li">
            <a className="reply_li_id fontcolor_black">{post.userinfo.nickname}</a>
            <span>
            <span dangerouslySetInnerHTML={{__html: post.content}}></span>
            </span>
        </li>
        {post.repliescount > 4 &&
        <li className="reply_li">
            <button className="reply_morebtn point">댓글 {post.repliescount}개 모두 보기</button>
        </li>
        }
        {post.replies.map((contact, i) => {
          return(
            <li className="reply_li" key={"reply"+i}>
              {/*contact.memid === '${sessionScope.loginmem.id}' &&
              <button className="reply_delbtn" title="댓글 삭제" onClick={()=>this.handleRemove(i)} >댓글 삭제</button>
              */}
              <a className="reply_li_id fontcolor_black">{contact.nickname}</a>
              <span>
                <span dangerouslySetInnerHTML={{__html: contact.content.replace(/@(\S*)/g,'<a href="search/@$1">@$1</a>')}}></span>
              </span>
            </li>
          );
        })}
      </ul>
    )
}

export default Contentview;

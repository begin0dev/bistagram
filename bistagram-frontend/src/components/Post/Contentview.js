import React from 'react';

const changeTag = (text) =>{
  text=text.replace(/#([a-z0-9가-힣][a-z0-9가-힣\-_]*)/ig, '<a href="search/tags/$1">#$1</a>');
  text=text.replace(/@([a-z0-9][a-z0-9\-_]*)/ig, '<a href="search/$1">@$1</a>');
  return text;
}

const changeNick = (text) =>{
  text=text.replace(/@([a-z0-9][a-z0-9\-_]*)/ig,'<a href="search/$1">@$1</a>');
  return text;
}

const Contentview = ({post, auth, hanedleDeleteReply, handleGetReplies}) => {
    return (
      <ul className="reply_ul_mgpd">
        <li className="reply_li">
            <a className="reply_li_id fontcolor_black">{post.userinfo.nickname}</a>
            <span>
              <span dangerouslySetInnerHTML={{__html: changeTag(post.content)}}></span>
            </span>
        </li>
        {post.repliescount !== post.replies.length ?
        <li className="reply_li">
            <button className="reply_morebtn point"
              onClick={handleGetReplies}>
              댓글 {post.repliescount}개 모두 보기
            </button>
        </li>
        :null}
        {post.replies.map((contact, i) => {
          return(
            <li className="reply_li" key={"reply"+i}>
              {contact.username === auth.userinfo.user.username &&
              <button className="reply_delbtn" title="댓글 삭제"
              onClick={(e) => hanedleDeleteReply(i)}>댓글 삭제</button>
              }
              <a className="reply_li_id fontcolor_black">{contact.nickname}</a>
              <span>
                <span dangerouslySetInnerHTML={{__html: changeNick(contact.content)}}></span>
              </span>
            </li>
          );
        })}
      </ul>
    )
}

export default Contentview;

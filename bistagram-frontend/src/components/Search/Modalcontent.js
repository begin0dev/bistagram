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

const Modalcontent = ({post, auth, handleReplyDelete}) => {
    let logusername=auth.userinfo.user.username;
    return (
      <div className="modal_content_section">
        <ul className="modal_content_ul">
          <li className="modal_content_li">
            <a href={`/search/${post.nickname}`} className="reply_li_id fontcolor_black">
              {post.nickname}
            </a>
            <span dangerouslySetInnerHTML={{__html: changeTag(post.content)}}></span>
          </li>

          {post.replies.map((contact, i) => {
            return(
              <li className="modal_content_li" key={"reply"+i}>
                {(logusername && logusername === contact.username) || (logusername &&logusername===post.username)?
                <button className="reply_delbtn" title="댓글 삭제" onClick={()=>handleReplyDelete(contact.replynum, i)}>
                  댓글 삭제
                </button>
                :null}

                <a href={`/search/${contact.nickname}`} className="reply_li_id fontcolor_black">{contact.nickname}</a>
                <span>
                  <span dangerouslySetInnerHTML={{__html: changeNick(contact.content)}}></span>
                </span>
              </li>
            );
          })}

        </ul>
      </div>
    )
}

export default Modalcontent;

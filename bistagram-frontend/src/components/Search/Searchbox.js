import React from 'react';

const fileName = filename =>{
  let _lastDot = filename.lastIndexOf('.');
  let imgfilename = filename.substring(0, _lastDot);
  return imgfilename;
}

const Searchbox = ({post}) => {
    return (
      <div className="search_box">
        <a>
          <div className="search_box_media_wrap">
            <div className="search_box_media_frame">
              <img className="search_box_img" src={`/upload/thumb/${fileName(post.medianame)}.png`} alt=""></img>
            </div>
          </div>
          {post.mediatype.match("video") &&
          <div className="search_video_icon_div">
            <div>
              <span className="imgs search_video_icon"></span>
            </div>
          </div>
          }
          <div className="search_box_mask">
            <ul className="search_box_ul">
              <li className="search_box_li search_box_like_mg">
                <span className="imgs search_like_img">좋아요</span>
                <span>{post.likecount}</span>개
              </li>
              <li className="search_box_li search_box_reply_mg">
                <span className="imgs search_reply_img">댓글</span>
                <span>{post.replycount}</span>개
              </li>
            </ul>
          </div>
        </a>
      </div>
    )
}

export default Searchbox;

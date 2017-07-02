import React from 'react';

const Searchbox = () => {
    return (
      <div className="search_box">
        <a>
          <div className="search_box_media_wrap">
            <div className="search_box_media_frame">
              <img className="search_box_img" src="/upload/thumb/test1@naver.com1498824335047.png" alt=""></img>
            </div>
          </div>
          <div className="search_video_icon_div">
            <div>
              <span className="imgs search_video_icon"></span>
            </div>
          </div>
          <div className="search_box_mask">
            <ul className="search_box_ul">
              <li className="search_box_li search_box_like_mg">
                <span className="imgs search_like_img">좋아요</span>
                <span>200</span>개
              </li>
              <li className="search_box_li search_box_reply_mg">
                <span className="imgs search_reply_img">댓글</span>
                <span>2011</span>개
              </li>
            </ul>
          </div>
        </a>
      </div>
    )
}

export default Searchbox;

import React from 'react';

import { Link } from 'react-router-dom';

import noimg from '../../img/noimg.jpg';

const Modalheader = ({post, auth, handleFollowClick}) => {
    let logusername=auth.userinfo.user.username;
    return (
      <header className="modal_header modal_header_position">
        <Link to={`/search/${post.nickname}`} className="profile_img_circle profile_img_a profile_img_size">
          <img
            src={!post.profileimgname ? noimg : '/upload/profile/'+post.profileimgname}
            className="postview_profileimg img_100" alt="">
          </img>
        </Link>
        <div className="modal_header_nickdiv">
          <Link to={`/search/${post.nickname}`} className="modal_header_nicka">{post.nickname}</Link>
        </div>
        <span className="modal_header_followsp">
          {logusername && logusername!== post.username &&
            auth.userinfo.followInfo.following.indexOf(post.username)!==-1 ?
              <button className="whitebtn btnstyle point"
                disabled={post.username===auth.recommend.clickUser ?true:''}
                onClick={() => handleFollowClick(post.username)}>
                팔로잉
              </button>
            :
            logusername !== post.username?
              <button className={`bluebtn btnstyle point ${post.username===auth.recommend.clickUser?'bluebtn_disable':''}`}
                disabled={post.username===auth.recommend.clickUser ?true:''}
                onClick={() => handleFollowClick(post.username)}>
                팔로우
              </button>:null
          }
        </span>
      </header>
    )
}

export default Modalheader;

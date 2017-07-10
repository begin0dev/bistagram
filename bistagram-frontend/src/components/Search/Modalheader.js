import React from 'react';

import noimg from '../../img/noimg.jpg';

const Modalheader = ({search, auth, handleFollowClick}) => {
    let logusername=auth.userinfo.user.username;
    return (
      <header className="modal_header modal_header_position">
        <a href={`/search/${search.modalpost.nickname}`} className="profile_img_circle profile_img_a profile_img_size">
          <img
            src={!search.modalpost.profileimgname ? noimg : '/upload/profile/'+search.modalpost.profileimgname}
            className="postview_profileimg img_100" alt="">
          </img>
        </a>
        <div className="modal_header_nickdiv">
          <a href={`/search/${search.modalpost.nickname}`} className="modal_header_nicka">{search.modalpost.nickname}</a>
        </div>
        <span className="modal_header_followsp">
          {logusername && logusername!== search.modalpost.username &&
            auth.userinfo.followInfo.follower.indexOf(search.modalpost.username)!==-1 ?
              <button className="whitebtn btnstyle point"
                disabled={search.modalpost.username===auth.recommend.clickUser ?true:''}
                onClick={() => handleFollowClick(search.modalpost.username)}>
                팔로잉
              </button>
            :
            logusername !== search.modalpost.username?
              <button className={`bluebtn btnstyle point ${search.modalpost.username===auth.recommend.clickUser?'bluebtn_disable':''}`}
                disabled={search.modalpost.username===auth.recommend.clickUser ?true:''}
                onClick={() => handleFollowClick(search.modalpost.username)}>
                팔로우
              </button>:null
          }
        </span>
      </header>
    )
}

export default Modalheader;

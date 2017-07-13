import React from 'react';
import { Link } from 'react-router-dom';

import noimg from '../../img/noimg.jpg';

const imgsize ={
  width: '30px',
  height: '30px'
}
const FollowUl = ({auth, follow, handleFollowClick}) => {
    return (
      <ul className="follow_list_ul">
        {follow.map((contact, i) => {
          return(
          <li className="follow_recommend" key={i}>
            <div className="li_wrap_div">
              <div className="profile_wrap_div">
                <Link to={`/search/${contact.nickname}`} className="profile_img_a profile_img_circle li_circleimg" style={imgsize}>
                  <img
                    src={!contact.profileimgname ? noimg : '/upload/profile/'+contact.profileimgname}
                    className="img_100" alt="">
                  </img>
                </Link>
                <div className="profile_info_wrap">
                  <div className="profile_nickname_div">
                    <Link to={`/search/${contact.nickname}`}
                      className="profile_info_nick profile_info_nickwrap"
                      title={contact.nickname}>{contact.nickname}
                    </Link>
                  </div>
                  <div className="profile_info_name">{contact.name}</div>
                </div>
              </div>
              <div className="folloew_btn_div">
                <span className="follow_btn_span">
                  {auth.userinfo.followInfo.following.indexOf(contact.username) !== -1?
                    <button
                      className="whitebtn btnstyle point"
                      disabled={contact.username===auth.recommend.clickUser ?true:''}
                      onClick={()=>handleFollowClick(contact.username)}>
                      팔로잉
                    </button>
                    :
                    <button
                      className={`bluebtn btnstyle point ${contact.username===auth.recommend.clickUser ? 'bluebtn_disable':''}`}
                      disabled={contact.username===auth.recommend.clickUser ?true:''}
                      onClick={()=>handleFollowClick(contact.username)}>
                      팔로우
                    </button>
                  }
                  {contact.username===auth.recommend.clickUser &&
                    <div className='loding_div loding_img'></div>
                  }
                </span>
              </div>
            </div>
          </li>
        );
      })}
      </ul>
    )
}

export default FollowUl;

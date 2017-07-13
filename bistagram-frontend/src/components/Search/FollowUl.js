import React from 'react';
import { Link } from 'react-router-dom';

import noimg from '../../img/noimg.jpg';

const imgsize ={
  width: '30px',
  height: '30px'
}
const FollowUl = ({auth, follow}) => {
    return (
      <ul className="follow_list_ul">
        <li className="follow_recommend">
          <div className="li_wrap_div">
            <div className="profile_wrap_div">
              <Link to={`/search/${follow.nickname}`} className="profile_img_a profile_img_circle li_circleimg" style={imgsize}>
                <img
                  src={!follow.profileimgname ? noimg : '/upload/profile/'+follow.profileimgname}
                  className="img_100" alt="">
                </img>
              </Link>
              <div className="profile_info_wrap">
                <div className="profile_nickname_div">
                  <Link to={`/search/${follow.nickname}`}
                    className="profile_info_nick profile_info_nickwrap"
                    title={follow.nickname}>{follow.nickname}
                  </Link>
                </div>
                <div className="profile_info_name">{follow.name}</div>
              </div>
            </div>
            <div className="folloew_btn_div">
              <span className="follow_btn_span">
                {auth.userinfo.followInfo.following.indexOf(follow.username) !== -1?
                  <button
                    className="whitebtn btnstyle point"
                    disabled={follow.username===auth.recommend.clickUser ?true:''}>
                    팔로잉
                  </button>
                  :
                  <button
                    className={`bluebtn btnstyle point ${follow.username===auth.recommend.clickUser ? 'bluebtn_disable':''}`}
                    disabled={follow.username===auth.recommend.clickUser ?true:''}>
                    팔로우
                  </button>
                }
                {follow.username===auth.recommend.clickUser &&
                  <div className='loding_div loding_img'></div>
                }
              </span>
            </div>
          </div>
        </li>
      </ul>
    )
}

export default FollowUl;

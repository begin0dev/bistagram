import React from 'react';

const Followbtns = ({search, auth, handleFollowClick}) => {
    let logusername=auth.userinfo.user.username;
    let scuserinfo=search.posts.userinfo;
    return (
      <span className="user_follow_info">
        {logusername && logusername !== scuserinfo.username &&
          auth.userinfo.followInfo.following.indexOf(scuserinfo.username)!==-1 ?
          <button className="whitebtn btnstyle point user_follow_btn"
            disabled={scuserinfo.username===auth.recommend.clickUser ?true:''}
            onClick={() => handleFollowClick(scuserinfo.username)}>
            팔로잉
          </button>
          :
          logusername !== scuserinfo.username?
            <button className={`bluebtn btnstyle point user_follow_btn ${scuserinfo.username===auth.recommend.clickUser?'bluebtn_disable':''}`}
              disabled={scuserinfo.username===auth.recommend.clickUser ?true:''}
              onClick={() => handleFollowClick(scuserinfo.username)}>
              팔로우
            </button>
          :null
        }
      </span>
    )
}

export default Followbtns;

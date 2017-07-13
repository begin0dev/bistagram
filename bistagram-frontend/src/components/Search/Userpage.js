import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import Loading from '../Loading';

import Searchbox from './Searchbox';
import Followbtns from './Followbtns';

import noimg from '../../img/noimg.jpg';

const Userpage = ({search, ui, auth, addUserPost, handleSearchModal, handleFollowClick, handleLogoutModal, handleFollowModal}) => {

    let logusername=auth.userinfo.user.username;
    let scuserinfo=search.posts.userinfo;
    return (
      <article className="search_wrap search_wrap_pdtop"  style={{display:`${ui.loading.search?'none':''}`}}>
        <header className="user_header">

          <div className="user_profile_div">
            <div className="user_profile_circle user_profile_circle_div">
              <img
                className="user_profile_circle_img" alt=""
                src={!scuserinfo.profileimgname ? noimg : '/upload/profile/'+scuserinfo.profileimgname}>
              </img>
            </div>
          </div>

          <div className="user_profile_info_div">

            <div className="user_nick_info_div">
              <h1 className="user_nick_info_h1" title={scuserinfo.nickname}>
                {scuserinfo.nickname}
              </h1>

              <Followbtns
                search={search}
                auth={auth}
                handleFollowClick={handleFollowClick}
              />

              {logusername === scuserinfo.username &&
                <Link to="/mypage/profile">
                  <button className="whitebtn btnstyle point user_follow_btn">
                    프로필 편집
                  </button>
                </Link>
              }
              {logusername === scuserinfo.username &&
                <div className="user_control_btn_div">
                  <button className="oldimgs user_control_btn" onClick={() => handleLogoutModal(true)}>옵션</button>
                </div>
              }
            </div>

            <div className="user_name_div">
              <h2 className="fontbold">{search.posts.userinfo.name}</h2>
            </div>

          </div>
        </header>


        <ul className="user_userinfo_ul user_mobile_ul">
          <li className="user_mobile_li">
            <span>게시물<br/>
              <span className="fontcolor_black fontbold">
                <NumberFormat value={search.posts.atccount} displayType={'text'} thousandSeparator={true}/>
              </span>
            </span>
          </li>
          <li className="user_mobile_li">
            <a className="point" style={{'color': 'inherit'}} onClick={()=>handleFollowModal(0)}>
              <span>팔로워<br/>
                <span className="fontcolor_black fontbold">
                  <NumberFormat value={scuserinfo.followercount} displayType={'text'} thousandSeparator={true}/>
                </span>
              </span>
            </a>
          </li>
          <li className="user_mobile_li">
            <a className="point" style={{'color': 'inherit'}} onClick={()=>handleFollowModal(1)}>
              <span>팔로우<br/>
                <span className="fontcolor_black fontbold">
                  <NumberFormat value={scuserinfo.followingcount} displayType={'text'} thousandSeparator={true}/>
                </span>
              </span>
            </a>
          </li>
        </ul>


        <div>
          <div className="grid_wrap">
            {search.posts.userAtcs.map((contact, i) => {
              return(
                <Searchbox
                  post={contact}
                  handleSearchModal={handleSearchModal}
                  index={i}
                  key={i}
                />
              );
            })}
          </div>
        </div>
        {!search.posts.moreView && search.posts.isMore ? <a className="moreview_btn_style moreview_btn" onClick={addUserPost}>더 읽어들이기</a>:null}

        {search.posts.moreView && search.posts.isMore &&
        <div className="loading_position">
          <Loading />
        </div>
        }
      </article>
    )
}

export default Userpage;

import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import Loading from '../Loading';

import Searchbox from './Searchbox';

import noimg from '../../img/noimg.jpg';

const Userpage = ({search, ui, auth, addHashPost, handleSearchModal, handleFollowClick}) => {

    let logusername=auth.userinfo.user.username;
    let scuserinfo=search.posts.userinfo;
    return (
      <article className="search_wrap search_wrap_pdtop"  style={{display:`${ui.loading.search?'none':''}`}}>
        <header className="user_header">

          <div className="user_profile_div">
            <div className="user_profile_circle user_profile_circle_div">
              <img className="user_profile_circle_img" src={noimg} alt=""></img>
            </div>
          </div>

          <div className="user_profile_info_div">

            <div className="user_nick_info_div">
              <h1 className="user_nick_info_h1" title={scuserinfo.nickname}>
                {scuserinfo.nickname}
              </h1>
              <span className="user_follow_info">
                {logusername && logusername !== scuserinfo.username &&
                  auth.userinfo.followInfo.follower.indexOf(scuserinfo.username)!==-1 ?
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
                {logusername === scuserinfo.username &&
                  <Link to="">
                    <button className="whitebtn btnstyle point user_follow_btn">
                      프로필 편집
                    </button>
                  </Link>
                }
              </span>
            </div>
            <ul className="user_notmobile_ul">
              <li className="user_notmobile_li">
                <span>게시물&nbsp;
                  <span className="fontbold">
                    <NumberFormat value={search.posts.atccount} displayType={'text'} thousandSeparator={true}/>
                  </span>
                </span>
              </li>
              <li className="user_notmobile_li">
                <span>팔로워&nbsp;
                  <span className="fontbold">
                    <NumberFormat value={scuserinfo.followingcount} displayType={'text'} thousandSeparator={true}/>
                  </span>
                </span>
              </li>
              <li className="user_notmobile_li">
                <span>팔로우&nbsp;
                  <span className="fontbold">
                    <NumberFormat value={scuserinfo.followercount} displayType={'text'} thousandSeparator={true}/>
                  </span>
                </span>
              </li>
            </ul>

            <div className="user_name_div">
              <h2 className="fontbold">{search.posts.userinfo.name}</h2>
            </div>

          </div>
        </header>
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
        {!search.posts.moreView && search.posts.isMore ? <a className="moreview_btn_style moreview_btn" onClick={addHashPost}>더 읽어들이기</a>:null}

        {search.posts.moreView && search.posts.isMore &&
        <div className="loading_position">
          <Loading />
        </div>
        }
      </article>
    )
}

export default Userpage;

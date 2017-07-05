import React from 'react'
import { Link } from 'react-router-dom';

import noimg from '../../img/noimg.jpg';

const imgsize ={
  width: '56px',
  height: '56px'
}

const FollowList = ({auth, page, handleFollowClick}) => {
    return (
      <ul className={`border_gray2 ${page === 'mainpost' ?'post_marginbt20px':'post_marginbt60px'}`}>
				{/*팔로우추천부분*/}
					<li className="follow_recommend">
						<div className="follow_li_titlediv">
							<h2 className="h2_title">{page === 'mainpost' ? '회원님을 위한 추천': '사람 찾기'}</h2>
              {page === 'mainpost' &&
							<Link to="/explore" className="fontcolor_blue">모두 보기<span className="imgs right_arrow"></span></Link>
              }
            </div>
					</li>
					{auth.recommend.users.map((contact, i) => {
						return(
							<li className="follow_recommend" key={"flli"+i}>
								<div className="li_wrap_div">
									<div className="profile_wrap_div">
										<a className="profile_img_a profile_img_circle li_circleimg" style={imgsize}>
											<img src={noimg} className="img_100" alt=""></img>
										</a>
										<div className="profile_info_wrap">
											<div className="profile_nickname_div">
												<a className="profile_info_nick profile_info_nickwrap" title={contact.nickname}>{contact.nickname}</a>
											</div>
											<div className="profile_info_name">{contact.name}</div>
										</div>
									</div>
									<div className="folloew_btn_div">
										<span className="follow_btn_span">
                      {auth.userinfo.followInfo.follower.indexOf(contact.username) !== -1?
  											<button
                          className="whitebtn btnstyle point"
                          disabled={contact.username===auth.recommend.clickUser ?true:''}
                          onClick={() => handleFollowClick(contact.username)}>
                          팔로잉
                        </button>
                        :
  											<button
                          className={`bluebtn btnstyle point ${contact.username===auth.recommend.clickUser ? 'bluebtn_disable':''}`}
                          disabled={contact.username===auth.recommend.clickUser ?true:''}
                          onClick={() => handleFollowClick(contact.username)}>
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

export default FollowList;

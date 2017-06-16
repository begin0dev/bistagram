import React from 'react'

const FollowLoader = ({follow, page, handleFollowClick}) => {
    return (
      <ul className="border_gray2 post_marginbt30px follow_ul">
				{/*팔로우추천부분*/}
					<li className="follow_recommend">
						<div className="follow_li_titlediv">
							<h2 className="h2_title">사람 찾기</h2>
            </div>
					</li>
          <li className="follow_recommend follow_recommend_loading">
            <div className='loding_div loding_lgimg'></div>
          </li>
				</ul>
    )
}

export default FollowLoader;

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import noimg from '../img/noimg.jpg';

import '../css/mypage.css';

import Profilefrm from '../components/Mypage/Profilefrm';
import Passwordfrm from '../components/Mypage/Passwordfrm';

class Mypage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      const { match } = this.props;
        return(
            <main className="mypage_main mypage_main_bg" role="main">
              <div className="mypage_frame">

            		<ul className="mypage_menu_navi">
            			<li><Link to="/mypage/profile" className={`mypage_menu_li ${match.params.page==="profile"?"mypage_menu_li_active":""}`}>프로필 편집</Link></li>
            			<li><Link to="/mypage/pwchange" className={`mypage_menu_li ${match.params.page==="pwchange"?"mypage_menu_li_active":""}`}>비밀번호 변경</Link></li>
            		</ul>

                <article className="mypage_content_wrap">
            		  <div className="mypage_content_header_wrap">
                    <div className="mypage_circle_div mypage_circle_div_pos">
              				<button className="mypage_circle_btn" title="프로필 사진 바꾸기">
              					<img alt="프로필 사진 바꾸기" className="user_profile_circle_img" src={noimg}>
                        </img>
              				</button>
              				<form encType="multipart/form-data">
              					<input type="file" accept="image/jpeg" className="frm_dis_none"/>
              				</form>
              			</div>
                    <h1 className="mypage_nick_title">prosonic1</h1>
                  </div>

                  <Route path="/mypage/profile" component={Profilefrm}/>
                  <Route path="/mypage/pwchange" component={Passwordfrm}/>

                </article>
              </div>
            </main>
        );
    }
}
export default Mypage;

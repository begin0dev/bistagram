import React, { Component } from 'react';

import noimg from '../img/noimg.jpg';

import '../css/mypage.css';

class Mypage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <main className="mypage_main mypage_main_bg" role="main">
              <div className="mypage_frame">

            		<ul className="mypage_menu_navi">
            			<li><a className="mypage_menu_li mypage_menu_li_active">프로필 편집</a></li>
            			<li><a className="mypage_menu_li">비밀번호 변경</a></li>
            		</ul>

                <article className="mypage_content_wrap">
            		  <div className="mypage_content_header_wrap">
                    <div className="mypage_circle_div mypage_circle_div_pos">
              				<button className="mypage_circle_btn" title="프로필 사진 바꾸기">
              					<img alt="프로필 사진 바꾸기"
                          className="user_profile_circle_img"
              						src={noimg}>
                        </img>
              				</button>
              				<form encType="multipart/form-data">
              					<input type="file" accept="image/jpeg" className="frm_dis_none"/>
              				</form>
              			</div>
                    <h1 className="mypage_nick_title">prosonic1</h1>
                  </div>


{/*                  <form className="_tf7jx">
              			<div className="_9w2xs">
              				<aside className="_891mt">
              				<label>이전 비밀번호</label></aside>
              				<div className="_lxlnj">
              					<input type="password" className="_1n8j5 _qy55y" aria-required="true" value=""/>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt">
              				<label>새 비밀번호</label></aside>
              				<div className="_lxlnj">
              					<input type="password" className="_1n8j5 _qy55y" aria-required="true" value=""/>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt">
              				<label>새 비밀번호 확인</label></aside>
              				<div className="_lxlnj">
              					<input type="password" className="_1n8j5 _qy55y" aria-required="true" value=""/>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt _1w5mb">
              				<label></label></aside>
              				<div className="_lxlnj">
              					<div className="_rlb47">
              						<span className="_7k49n">
                            <button	className="_ah57t _84y62 _frcv2 _4un9f" disabled="">비밀번호 변경</button>
                          </span>
              					</div>
              				</div>
              			</div>
              		</form>*/}

                  <form className="_cmoxu">
              			<div className="_9w2xs">
              				<aside className="_891mt">
                        <label>이름</label>
                      </aside>
              				<div className="_lxlnj">
              					<input type="text" className="_cm95b _qy55y" aria-required="false" value="Sooyoung"/>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt">
                        <label>사용자 이름</label>
                      </aside>
              				<div className="_lxlnj">
              					<input type="text" className="_cm95b _qy55y" aria-required="true" value="prosonic1"/>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt"> <label for="pepWebsite">웹사이트</label></aside>
              				<div className="_lxlnj">
              					<input type="text" className="_cm95b _qy55y" aria-required="false" value=""/>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt"> <label for="pepBio">소개</label></aside>
              				<div className="_lxlnj">
              					<textarea className="_9pfjt" id="pepBio"></textarea>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt _1w5mb"> <label></label></aside>
              				<div className="_lxlnj">
              					<div className="_sdis1">
              						<h2 className="_bgfey">개인 정보</h2>
              					</div>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt"> <label for="pepEmail">이메일</label></aside>
              				<div className="_lxlnj">
              					<input type="text" className="_cm95b _qy55y" aria-required="false" value="prosonic1@naver.com"/>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt"> <label for="pepPhone Number">전화번호</label></aside>
              				<div className="_lxlnj">
              					<input type="text" className="_cm95b _qy55y" aria-required="false" value="+82 10-2102-0330"/>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt"> <label for="pepGender">성별</label></aside>
              				<div className="_lxlnj">
              					<div className="_9fc9f">
              						<span className="_hfy0p _soakw coreSpriteChevronDownGrey"></span>
                            <select className="_2j83n">
                              <option value="1">남성</option>
                							<option value="2">여성</option>
                							<option value="3">선택 안 함</option>
                            </select>
              					</div>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt"> <label>비슷한 계정 추천</label></aside>
              				<div className="_lxlnj">
              					<div className="_pjb58">
              						<label className="_7mmhf" for="pepChainingEnabled">
                          <input type="checkbox" className="_pdfe4" value="on"/>
              							<div className="_jheiw"></div></label>
              					</div>
              					<label className="_q3o2l" for="pepChainingEnabled">
                        팔로우할만한 비슷한 계정을 추천할 때 회원님의 계정을 포함합니다.
                        <a className="_6dth5" href="https://help.instagram.com/530450580417848"	target="_blank">[?]</a>
              					</label>
              				</div>
              			</div>
              			<div className="_9w2xs">
              				<aside className="_891mt _1w5mb"> <label></label></aside>
              				<div className="_lxlnj">
              					<div className="_c7q5m">
              						<span className="_7k49n"><button
              								className="_ah57t _84y62 _frcv2 _rmr7s">제출</button></span><a className="_5r95g"
              							href="/accounts/remove/request/temporary/">계정을 일시적으로 비활성화</a>
              					</div>
              				</div>
              			</div>
              		</form>

                </article>
              </div>
            </main>
        );
    }
}
export default Mypage;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';

import noimg from '../img/noimg.jpg';

import '../css/mypage.css';

import * as auth from '../actions/auth';
import * as form from '../actions/form';
import * as ui from '../actions/ui';

import Profilefrm from '../components/Mypage/Profilefrm';
import Passwordfrm from '../components/Mypage/Passwordfrm';
import ProfileImgModal from '../components/Mypage/ProfileImgModal';

class Mypage extends Component {

    componentDidMount() {

    }
    handleChange = (e) =>{
      this.changeFormData({form:'mypage', name: e.target.name, value: e.target.value});
    }
    handleProfileClick = () =>{
      this.handleProfileModal(false);
      this.ProfileInput.click();
    }
    handleProfileImg = (e) =>{
      e.preventDefault();
      const { auth, profileImgUpdate } = this.props;
      let profileimg = e.target.files[0];
      let formdata=new FormData();
      formdata.append('profileimg', profileimg);
      formdata.append('preprofilename', auth.userinfo.user.profileimgname);
      profileImgUpdate(formdata);
      e.target.value='';
    }
    handleProfileImgDelete = () =>{
      const { auth, profileImgDelete } = this.props;
      this.handleProfileModal(false);
      profileImgDelete({preprofilename: auth.userinfo.user.profileimgname});
    }
    handleProfileModal = (value) =>{
      this.props.setMypageModal({name: 'profileImgModal', value: value});
    }
    render() {
      const { ui, auth, match } = this.props;
        return(
            <main className="mypage_main mypage_main_bg" role="main">
              {!auth.userinfo.user.username &&
                <Redirect to="/"/>
              }
              <div className="mypage_frame">

            		<ul className="mypage_menu_navi">
            			<li>
                    <Link to="/mypage/profile" className={`mypage_menu_li ${match.params.page==="profile"?"mypage_menu_li_active":"mypage_menu_li_none"}`}>
                      프로필 편집
                    </Link>
                  </li>
            			<li>
                    <Link to="/mypage/pwchange" className={`mypage_menu_li ${match.params.page==="pwchange"?"mypage_menu_li_active":"mypage_menu_li_none"}`}>
                      비밀번호 변경
                    </Link>
                  </li>
            		</ul>

                <article className="mypage_content_wrap">
            		  <div className="mypage_content_header_wrap">
                    <div className="mypage_circle_div mypage_circle_div_pos">
              				<button className="mypage_circle_btn" title="프로필 사진 바꾸기" onClick={()=>this.handleProfileModal(true)}>
              					<img alt="프로필 사진 바꾸기" className="user_profile_circle_img"
                          src={!auth.userinfo.user.profileimgname ? noimg : '/upload/profile/'+auth.userinfo.user.profileimgname}>
                        </img>
              				</button>
              				<form encType="multipart/form-data">
              					<input type="file" accept="image/jpeg" className="frm_dis_none"
                          ref={(input) => { this.ProfileInput = input }}
                        	onChange={this.handleProfileImg}
                        />
              				</form>
              			</div>
                    <h1 className="mypage_nick_title">ffff</h1>
                  </div>

                  <Route path="/mypage/profile" component={Profilefrm}/>
                  <Route path="/mypage/pwchange" component={Passwordfrm}/>

                </article>
              </div>
              {ui.profileImgModal &&
              <ProfileImgModal
                handleProfileModal={this.handleProfileModal}
                handleProfileClick={this.handleProfileClick}
                handleProfileImgDelete={this.handleProfileImgDelete}
              />
              }
            </main>
        );
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  form: state.form,
  ui: state.ui
});

const mapDispatchToProps = (dispatch) => ({
  changeFormData: (formname, name, value) => dispatch(form.changeFormData(formname, name, value)),
  formDataReset: () => dispatch(form.formDataReset()),

  profileImgUpdate: (formdata) => dispatch(auth.profileImgUpdate(formdata)),
  profileImgDelete: (params) => dispatch(auth.profileImgDelete(params)),

  setMypageModal: (params) => dispatch(ui.setMypageModal(params))
})


Mypage = connect(mapStateToProps, mapDispatchToProps)(Mypage)

export default Mypage;

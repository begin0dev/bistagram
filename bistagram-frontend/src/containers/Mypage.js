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

const regex ={
  regemail: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  regphone: /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/,
  regnickname: /^[0-9a-z_]{5,20}$/,
  regpassword: /^.{6,20}$/,
  regnum: /^[0-9]+$/
}

class Mypage extends Component {

    componentDidMount() {
      const {auth, form, setMypageForm} = this.props;
      if(!form.mypage.status.change){
        setMypageForm(auth.userinfo.user);
      }
    }
    handleMypageTextChange = (e) =>{
      this.props.changeMypageForm({name: e.target.name, value: e.target.value});
    }
    handlePwChange = (e) =>{
      this.props.changeFormData({form:"password", name: e.target.name, value: e.target.value})
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
    handleProfileUpdate = async () =>{
      const {form, checkSession, profileUpdate, setProfileError}= this.props;
      if(!regex.regnickname.test(form.mypage.nickname)){
        setProfileError({name: "mypage", message: "사용자 이름에는 문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다."});
        return;
      }
      if(form.mypage.email && !regex.regemail.test(form.mypage.email)){
        setProfileError({name: "mypage", message: "이메일 형식이 올바르지 않습니다."});
        return;
      }
      if(form.mypage.phone && !regex.regphone.test(form.mypage.phone)){
        setProfileError({name: "mypage", message: "전화번호 형식이 올바르지 않습니다."});
        return;
      }
      await profileUpdate(form.mypage).then(()=> checkSession());
    }
    handlePwUpdate = () =>{
      const {form, passwordUpdate, setProfileError} = this.props;
      if(form.password.changepassword!==form.password.checkpassword){
        setProfileError({name: "password", message: "두개의 비밀번호 필드가 일치하지 않습니다."});
        return;
      }
      passwordUpdate({prepassword: form.password.prepassword, changepassword:form.password.changepassword});
    }
    render() {
      const { ui, auth, form, match } = this.props;
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
                  {auth.userinfo.user.username && auth.userinfo.user.username.substring(0, 3)!=='fb:'&&
            			<li>
                    <Link to="/mypage/pwchange" className={`mypage_menu_li ${match.params.page==="pwchange"?"mypage_menu_li_active":"mypage_menu_li_none"}`}>
                      비밀번호 변경
                    </Link>
                  </li>
                  }
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
                    <h1 className="mypage_nick_title">{form.mypage.nickname}</h1>
                  </div>

                  <Route path="/mypage/profile"
                    render={()=>
                      <Profilefrm
                        form={form}
                        handleMypageTextChange={this.handleMypageTextChange}
                        handleProfileUpdate={this.handleProfileUpdate}
                      />
                    }
                  />
                  <Route path="/mypage/pwchange"
                    render={()=>
                      <Passwordfrm
                        form={form}
                        postformReset={this.props.postformReset}
                        handlePwChange={this.handlePwChange}
                        handlePwUpdate={this.handlePwUpdate}
                      />
                    }
                  />

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
  postformReset: () => dispatch(form.postformReset()),
  changeFormData: (formname, name, value) => dispatch(form.changeFormData(formname, name, value)),
  formDataReset: () => dispatch(form.formDataReset()),
  setMypageForm: (params) => dispatch(form.setMypageForm(params)),
  changeMypageForm: (params) => dispatch(form.changeMypageForm(params)),
  profileUpdate: (params) => dispatch(form.profileUpdate(params)),
  passwordUpdate: (params) => dispatch(form.passwordUpdate(params)),
  setProfileError: (params) => dispatch(form.setProfileError(params)),

  profileImgUpdate: (formdata) => dispatch(auth.profileImgUpdate(formdata)),
  profileImgDelete: (params) => dispatch(auth.profileImgDelete(params)),
  checkSession: () => dispatch(auth.checkSession()),

  setMypageModal: (params) => dispatch(ui.setMypageModal(params))
})


Mypage = connect(mapStateToProps, mapDispatchToProps)(Mypage)

export default Mypage;

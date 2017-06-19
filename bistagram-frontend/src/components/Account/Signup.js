import React, { Component } from 'react';
import { storage } from '../../helpers';

const regex ={
  regemail: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  regphone: /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/,
  regnickname: /^[0-9a-z_]{5,20}$/,
  regpassword: /^.{6,20}$/,
  regnum: /^[0-9]+$/
}

class Register extends Component {

  constructor(props) {
      super(props);
      this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange = (e) =>{
    this.props.changeUserData({form:'register', name: e.target.name, value: e.target.value})
  }

  handleBlur = (e) => {
    const {changeCheck, checkUserName, checkNickName} = this.props;

    let target=e.target.name;
    let value=e.target.value;

    if(value.length === 0){
      changeCheck({name:target, value:false});
      return;
    }

    //id check
    if(target === 'username'){
      if(!regex.regemail.test(value) && !regex.regphone.test(value)){
        changeCheck({name:target, value:false});
      }
      else{
        checkUserName(value);
      }
    }

    //nick check
    else if(target === "nickname"){
      if(!regex.regnickname.test(value)){
        changeCheck({name:target, value:false});
      }
      else{
        checkNickName(value);
      }
    }

    //pw check
    else if(target === "password"){
      if(!regex.regpassword.test(value)){
        changeCheck({name:target, value:false});
      }
      else{
        changeCheck({name:target, value:true});
      }
    }

  }

  async handleSubmit(){
    const {auth, signUp, changeCheck, setErrorMessage, setSubmitStatus} = this.props;
    
    setSubmitStatus({name: 'signup', value: true});

    let username_val=auth.register.username;
    let nickname_val=auth.register.nickname;
    let password_val=auth.register.password;

    if(auth.register.checked.username === undefined){
      changeCheck({name: 'username', value:false});
    }
    if(auth.register.checked.nickname === undefined){
      changeCheck({name: 'nickname', value:false});
    }
    if(auth.register.checked.password === undefined){
      changeCheck({name: 'password', value:false});
    }

    if(!username_val || !nickname_val || !password_val){
      setErrorMessage({name: "register", msg:"필수 항목입니다."});
    }
    else if(regex.regnum.test(username_val)){
      if(!regex.regphone.test(username_val)){
        setErrorMessage({name: "register", msg:"휴대폰 번호가 정확하지 않은 것 같습니다. 국가 번호를 포함하여 전체 전화번호를 입력해주세요."});
      }
    }
    else if(!regex.regemail.test(username_val)){
      setErrorMessage({name: "register", msg:"올바른 이메일 주소를 입력하세요."});    }
    else if(!auth.register.checked.username){
      setErrorMessage({name: "register", msg:`다른 계정에서 ${username_val} 주소를 사용하고 있습니다.`});
    }
    else if(!regex.regnickname.test(nickname_val)){
      setErrorMessage({name: "register", msg:"사용자 이름에는 문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다."});
    }
    else if(!auth.register.checked.nickname){
      setErrorMessage({name: "register", msg:"다른 사람이 이용 중인 사용자 이름입니다."});
    }
    else if(!regex.regpassword.test(password_val)){
      setErrorMessage({name: "register", msg:"6자 이상의 비밀번호를 만드세요."});
    }
    else{
      await signUp(auth.register);
      storage.set('session', this.props.auth.session);
    }
    setSubmitStatus({name: 'signup', value: false});
  }

  handleKeyPress = (e) => {
    if(e.charCode ===13 ){
      this.handleSubmit();
    }
  }

  render() {
    const {auth, panelChange} = this.props;
    return(
      <div className="loginwrap_div">
        <div className="border_div border_gray">
          <h1 className="bistatitle titleblock">Bistagram</h1>
            <div className="loginfrm_div">
              <form className="inputForm">
                <h2 className="subtitle">친구들의 사진과 동영상을 보려면 가입하세요.</h2>
                <div className="logininput_div">
                  <input type="text" className="logininput_txt"
                  name="username" maxLength="30"
                  aria-describedby="" aria-label="휴대폰 번호 또는 이메일 주소"
                  aria-required="true" autoCapitalize="off" autoCorrect="off"
                  placeholder="휴대폰 번호 또는 이메일 주소"
                  value={auth.register.username}
                  ref={(input) => { this.InputUserName = input; }}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}/>
                  <div className="inputinfo_div">
                  {auth.register.checked.username !== undefined &&
                    <span className={`input_img ${auth.register.checked.username?"inputAceept_img":"inputError_img"}`}></span>
                  }
                  </div>
                </div>
                <div className="logininput_div">
                  <input type="text" className="logininput_txt"
                  name="name" maxLength="20"
                  aria-describedby="" aria-label="성명" aria-required="true"
                  autoCapitalize="off" autoCorrect="off" placeholder="성명"
                  value={auth.register.name}
                  onChange={this.handleChange}/>
                </div>
                <div className="logininput_div">
                  <input type="text" className="logininput_txt"
                  name="nickname" maxLength="20"
                  aria-describedby="" aria-label="사용자 이름" aria-required="true"
                  autoCapitalize="off" autoCorrect="off" placeholder="사용자 이름"
                  value={auth.register.nickname}
                  ref={(input) => { this.InputNickName = input; }}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}/>
                  <div className="inputinfo_div">
                  {auth.register.checked.nickname !== undefined &&
                      <span className={`input_img ${auth.register.checked.nickname?"inputAceept_img":"inputError_img"}`}></span>
                  }
                  </div>
                </div>
                <div className="logininput_div">
                  <input type="password" className="logininput_txt"
                  name="password" maxLength="15"
                  aria-describedby="" aria-label="비밀번호" aria-required="true"
                  autoCapitalize="off" autoCorrect="off" placeholder="비밀번호"
                  value={auth.register.password}
                  ref={(input) => { this.InputPassword = input; }}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}/>
                  <div className="inputinfo_div">
                  {auth.register.checked.password !== undefined &&
                      <span className={`input_img ${auth.register.checked.password?"inputAceept_img":"inputError_img"}`}></span>
                  }
                  </div>
                </div>
                <div>
                  <span className="regiinput_btn_span">
                    <button type="button"
                    className={`bluebtn btnstyle point ${auth.submitStatus.signup?"bluebtn_disable":""}`}
                    onClick={this.handleSubmit}
                    disabled={auth.submitStatus.signup&&"true"}>
                    가입
                    </button>
                    {auth.submitStatus.signup&&
                    <div className='loding_div loding_img'></div>
                    }
                  </span>
                </div>
                {auth.register.status.error &&
                <div className="alert_div">
                  <p aria-atomic="true" role="alert">{auth.register.status.message}</p>
                </div>
                }
                <p className="p_style ">가입하면 Bistagram의 <a className="fontcolor_gray fontbold" href="/">약관</a>
                및 <a className="fontcolor_gray fontbold" href="/">개인정보처리방침</a>에 동의하게 됩니다.
                </p>
              </form>
            </div>
          </div>
          <div className="border_div border_gray">
            <p className="question_p">계정이 있으신가요? <a className='fontcolor_blue point' onClick={panelChange}>로그인</a></p>
          </div>
        </div>
    );
  }
}

export default Register;

import React, { Component } from 'react';
import { storage } from '../../helpers';

const regex ={
  regemail: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  regphone: /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/,
  regnick: /^[0-9a-z_]{5,20}$/,
  regpw: /^.{6,20}$/,
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
    const {changeCheck, checkUserId, checkUserNick} = this.props;

    let target=e.target.name;
    let value=e.target.value;

    if(value.length === 0){
      changeCheck({name:target, value:false});
      return;
    }

    //id check
    if(target === 'id'){
      if(!regex.regemail.test(value) && !regex.regphone.test(value)){
        changeCheck({name:target, value:false});
      }
      else{
        checkUserId(value);
      }
    }

    //nick check
    else if(target === "nick"){
      if(!regex.regnick.test(value)){
        changeCheck({name:target, value:false});
      }
      else{
        checkUserNick(value);
      }
    }

    //pw check
    else if(target === "pw"){
      if(!regex.regpw.test(value)){
        changeCheck({name:target, value:false});
      }
      else{
        changeCheck({name:target, value:true});
      }
    }

  }

  async handleSubmit(){
    const {auth, signUp, signIn, changeCheck, setErrorMessage, setSubmitStatus} = this.props;
    let session = storage.get('session');

    setSubmitStatus({name: 'signup', value: true});

    let id_val=auth.register.id;
    let nick_val=auth.register.nick;
    let pw_val=auth.register.pw;

    if(auth.register.checked.id === undefined){
      changeCheck({name: 'id', value:false});
    }
    if(auth.register.checked.nick === undefined){
      changeCheck({name: 'nick', value:false});
    }
    if(auth.register.checked.pw === undefined){
      changeCheck({name: 'pw', value:false});
    }

    if(!id_val || !nick_val || !pw_val){
      setErrorMessage({name: "register", msg:"필수 항목입니다."});
    }
    else if(regex.regnum.test(id_val)){
      if(!regex.regphone.test(id_val)){
        setErrorMessage({name: "register", msg:"휴대폰 번호가 정확하지 않은 것 같습니다. 국가 번호를 포함하여 전체 전화번호를 입력해주세요."});
      }
    }
    else if(!regex.regemail.test(id_val)){
      setErrorMessage({name: "register", msg:"올바른 이메일 주소를 입력하세요."});    }
    else if(!auth.register.checked.id){
      setErrorMessage({name: "register", msg:`다른 계정에서 ${id_val} 주소를 사용하고 있습니다.`});
    }
    else if(!regex.regnick.test(nick_val)){
      setErrorMessage({name: "register", msg:"사용자 이름에는 문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다."});
    }
    else if(!auth.register.checked.nick){
      setErrorMessage({name: "register", msg:"다른 사람이 이용 중인 사용자 이름입니다."});
    }
    else if(!regex.regpw.test(pw_val)){
      setErrorMessage({name: "register", msg:"6자 이상의 비밀번호를 만드세요."});
    }
    else{
      await signUp(auth.register);
      await signIn({id:auth.register.id, pw:auth.register.pw});
      storage.set('session', {...session, user: auth.session.user, logged: true});
      document.location = "/"
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
                  name="id" maxLength="30"
                  aria-describedby="" aria-label="휴대폰 번호 또는 이메일 주소"
                  aria-required="true" autoCapitalize="off" autoCorrect="off"
                  placeholder="휴대폰 번호 또는 이메일 주소"
                  value={auth.register.id}
                  ref={(input) => { this.InputId = input; }}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}/>
                  <div className="inputinfo_div">
                  {auth.register.checked.id !== undefined &&
                    <span className={`input_img ${auth.register.checked.id?"inputAceept_img":"inputError_img"}`}></span>
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
                  name="nick" maxLength="20"
                  aria-describedby="" aria-label="사용자 이름" aria-required="true"
                  autoCapitalize="off" autoCorrect="off" placeholder="사용자 이름"
                  value={auth.register.nick}
                  ref={(input) => { this.InputNick = input; }}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}/>
                  <div className="inputinfo_div">
                  {auth.register.checked.nick !== undefined &&
                      <span className={`input_img ${auth.register.checked.nick?"inputAceept_img":"inputError_img"}`}></span>
                  }
                  </div>
                </div>
                <div className="logininput_div">
                  <input type="password" className="logininput_txt"
                  name="pw" maxLength="15"
                  aria-describedby="" aria-label="비밀번호" aria-required="true"
                  autoCapitalize="off" autoCorrect="off" placeholder="비밀번호"
                  value={auth.register.pw}
                  ref={(input) => { this.InputPw = input; }}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}/>
                  <div className="inputinfo_div">
                  {auth.register.checked.pw !== undefined &&
                      <span className={`input_img ${auth.register.checked.pw?"inputAceept_img":"inputError_img"}`}></span>
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

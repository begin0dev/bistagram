import React, { Component } from 'react';
import { storage } from '../../helpers';

class Signin extends Component {

  constructor(props) {
      super(props);
      this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange = (e) =>{
    this.props.changeUserData({form:'login', name: e.target.name, value: e.target.value})
  }

  async handleSubmit() {
    const {auth, signIn, setErrorMessage, setSubmitStatus} = this.props;
    let session = storage.get('session');

    setSubmitStatus({name: 'signin', value: true});

    await signIn(auth.login);
    if(this.props.auth.session.logged){
      storage.set('session', {...session, user: this.props.auth.session.user, logged: true});
      document.location = "/"
    }
    else if(auth.login.id.length === 0){
      setErrorMessage({name: "login", msg:"입력한 사용자 이름이 계정과 일치하지 않습니다. 사용자 이름을 확인하고 다시 시도하세요."});
    }
    else{
      setErrorMessage({name: "login", msg:"잘못된 비밀번호입니다. 다시 확인하세요."});
    }
    setSubmitStatus({name: 'signin', value: false});
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
              <div className="logininput_div">
                <input type="text" className="logininput_txt" name="id" maxLength="30"
                aria-describedby="" aria-label="휴대폰 번호 또는 이메일 주소"
                aria-required="true" autoCapitalize="off" autoCorrect="off"
                placeholder="휴대폰 번호 또는 이메일 주소"
                value={auth.login.id} onChange={this.handleChange}/>
              </div>
              <div className="logininput_div">
                <input type="password" className="logininput_txt" name="pw" maxLength="15"
                aria-describedby="" aria-label="비밀번호" aria-required="true"
                autoCapitalize="off" autoCorrect="off" placeholder="비밀번호"
                value={auth.login.pw} onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}/>
                <div className="inputinfo_div">
                  <a className="">비밀번호를 잊으셨나요?</a>
                </div>
              </div>
              <span className="logininput_btn_span logininput_btn_block">
                <button type="button"
                className={`bluebtn btnstyle point ${auth.submitStatus.signin?"bluebtn_disable":""}`}
                onClick={this.handleSubmit}
                disabled={auth.submitStatus.signin&&"true"}>
                로그인
                </button>
                {auth.submitStatus.signin&&
                <div className='loding_div loding_img'></div>
                }
              </span>
              {auth.login.status.error &&
              <div className="alert_div">
                <p aria-atomic="true" role="alert">{auth.login.status.message}</p>
              </div>
              }
            </form>
          </div>
        </div>
        <div className="border_div border_gray">
          <p className="question_p">계정이 없으신가요? <a className='fontcolor_blue point' onClick={panelChange}>가입하기</a></p>
        </div>
      </div>
    );
  }
}

export default Signin;

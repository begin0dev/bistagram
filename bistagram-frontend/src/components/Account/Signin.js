import React, { Component } from 'react';
import {storage} from '../../helpers';

class Signin extends Component {

  handleChange = (e) =>{
    this.props.changeFormData({form:'login', name: e.target.name, value: e.target.value})
  }

  handleSubmit = async () =>{
    const {form, signIn, setSubmitStatus} = this.props;
    setSubmitStatus({name: 'signin', value: true});
    await signIn(form.login).then(()=>{
      storage.set('session', {logged: this.props.form.submitStatus.logged});
      this.props.form.submitStatus.logged?document.location.reload():setSubmitStatus({name: 'signin', value: false})
    })
  }

  handleKeyPress = (e) => {
    if(e.charCode ===13 ){
      this.handleSubmit();
    }
  }

  render() {
    const {form, panelChange} = this.props;
    return(
      <div className="loginwrap_div">
        <div className="border_div border_gray">
          <h1 className="bistatitle titleblock">Bistagram</h1>
          <div className="loginfrm_div">
            <form className="inputForm">
              <div className="logininput_div">
                <input type="text" className="logininput_txt" name="username" maxLength="30"
                aria-describedby="" aria-label="휴대폰 번호 또는 이메일 주소"
                aria-required="true" autoCapitalize="off" autoCorrect="off"
                placeholder="휴대폰 번호 또는 이메일 주소"
                value={form.login.username} onChange={this.handleChange}/>
              </div>
              <div className="logininput_div">
                <input type="password" className="logininput_txt" name="password" maxLength="15"
                aria-describedby="" aria-label="비밀번호" aria-required="true"
                autoCapitalize="off" autoCorrect="off" placeholder="비밀번호"
                value={form.login.password} onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}/>
                <div className="inputinfo_div">
                  <a className="">비밀번호를 잊으셨나요?</a>
                </div>
              </div>
              <span className="logininput_btn_span logininput_btn_block">
                <button type="button"
                className={`bluebtn btnstyle point ${form.submitStatus.signin?"bluebtn_disable":""}`}
                onClick={this.handleSubmit}
                disabled={form.submitStatus.signin&&"true"}>
                로그인
                </button>
                {form.submitStatus.signin&&
                <div className='loding_div loding_img'></div>
                }
              </span>
              {form.login.status.error &&
              <div className="alert_div">
                <p aria-atomic="true" role="alert">{form.login.status.message}</p>
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

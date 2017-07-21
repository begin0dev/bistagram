import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';

import {storage} from '../helpers';

import * as form from '../actions/form';

import '../css/login.css';
import '../css/fblogged.css';

const regex ={
  regnickname: /^[0-9a-z_]{5,20}$/
}

class Fblogged extends Component {
    componentWillUnmount() {
      this.props.formDataReset();
    }
    handleChange = (e) =>{
      const {changeCheck, checkNickName, changeFormData} = this.props;
      let target=e.target.name;
      let value=e.target.value;
      changeFormData({form:'register', name: target, value: value});
      if(value.length === 0){
        changeCheck({name:target, value:false});
        return;
      }
      if(!regex.regnickname.test(value)){
        changeCheck({name:target, value:false});
      }
      else{
        checkNickName(value);
      }
    }
    handlePageChange = async () =>{
      const {form, facebookSetNickname} = this.props;
      await facebookSetNickname({nickname:form.register.nickname}).then(()=>{
        storage.set('session', {logged: this.props.form.submitStatus.logged});
        if(this.props.form.submitStatus.logged){
          document.location='/';
        }
      });
    }
    render() {
      const {form} = this.props;
      const pagename=this.props.match.params.result;
        return(
          <div className="fb_logged_body">

            {pagename === 'success' &&
              <Redirect to="/"/>
            }
            {pagename !== 'success' && pagename !== 'failure' && pagename !== 'register' &&
              <Redirect to="/NotFound"/>
            }

            <div className="fb_logged_wrap">
              <div>
                <Link to="/" className="bistatitle fb_title_mg"></Link>
              </div>
              <div className="fb_txt_pos1">
                {pagename === 'failure' &&
                  <p>
                    회원님의 Facebook 계정과 Bistagram이 연결에 실패하였습니다.
                  </p>
                }
                {pagename === 'register' &&
                  <p>
                    회원님이 사용하실 Bistagram의 사용자 이름을 지정해주세요.
                  </p>
                }
              </div>
              <div className="fb_txt_pos2">
                <form className="inputForm">
                  <div className="logininput_div">
                    <input type="text" className="logininput_txt"
                      name="nickname" maxLength="20"
                      aria-describedby="" aria-label="사용자 이름" aria-required="true"
                      autoCapitalize="off" autoCorrect="off" placeholder="사용자 이름"
                      value={form.register.nickname}
                      ref={(input) => { this.InputNickName = input; }}
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                    />

                    <div className="inputinfo_div">
                      {form.register.checked.nickname !== undefined &&
                        <span className={`input_img ${form.register.checked.nickname?"inputAceept_img":"inputError_img"}`}></span>
                      }
                    </div>
                  </div>

                  <div>
                    <span className="regiinput_btn_span logininput_btn_block">
                      <button type="button"
                        className={`bluebtn btnstyle point ${form.register.checked.nickname === undefined || !form.register.checked.nickname?'bluebtn_disable':''}`}
                        onClick={this.handlePageChange}
                        disabled={form.register.checked.nickname === undefined || !form.register.checked.nickname?true:false}
                      >
                      {pagename === 'register' ?
                        '시작하기':
                        '가입하기'
                      }
                      </button>
                      {form.submitStatus.facebookPage &&
                        <div className='loding_div loding_img'></div>
                      }
                    </span>
                  </div>
                  {form.register.status.error &&
                    <div className="alert_div">
                      <p aria-atomic="true" role="alert">{form.register.status.message}</p>
                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
  form: state.form,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  changeFormData: (formname, name, value) => dispatch(form.changeFormData(formname, name, value)),
  checkNickName: (nickname) => dispatch(form.checkNickName(nickname)),
  changeCheck: (name, value) => dispatch(form.changeCheck(name, value)),
  formDataReset: () => dispatch(form.formDataReset()),
  facebookSetNickname: (params)  => dispatch(form.facebookSetNickname(params))
})


Fblogged = connect(mapStateToProps, mapDispatchToProps)(Fblogged)
export default withRouter(Fblogged);

import React, { Component } from 'react';

class Dropout extends Component {
    componentWillUnmount() {
      this.props.postformReset();
    }
    render() {
      const {auth, form, handlePwChange, handleDropOutSubmit} = this.props;
        return(
          <div className="dropout_pos">
            <h1 className="dropout_title">
              계정 탈퇴
            </h1>
            <p>
              <span className="fontbold">{auth.userinfo.user.nickname}</span>님, 안녕하세요!
            </p>
            <p>
              계정을 탈퇴하시면 올리신 포스트, 댓글과 팔로우 등 모든 정보가 깨끗이 삭제됩니다.
            </p>
            <p className="p_top_line">
              한번 삭제된 계정은 되돌릴수 없으니 신중히 결정해주세요.
            </p>
            <form className="dropout_form">
              <div className="dropout_pwcheck_form">
                <aside className="dropout_aside">
                  <label>
                    비밀번호를 입력하세요!
                  </label>
                </aside>
                <div className="dropout_pw_div">
                  <input type="password" className="dropout_pw_input" aria-required="true"
                  name="prepassword" maxLength="15" onChange={handlePwChange}
                  value={form.password.prepassword}/>
                </div>
              </div>
              <div className="dropout_bottom_line"> </div>
              <p>facebook 계정 연동이신분은 그냥 탈퇴하기를 누르시면 됩니다.</p>
              <div className="dropout_submit_div">
                <span className="mypage_submit_span">
                  <button className="mypage_submit_size mypage_submit_blue mypage_submit_pd point"
                    type="button" onClick={handleDropOutSubmit}
                    disabled={auth.userinfo.user.username.substring(0,3)!=="fb:"
                    &&form.password.prepassword.length===0?true:''}>
                    탈퇴하기
                  </button>
                </span>
              </div>
              {form.password.status.message &&
              <div className="dropout_submit_div">
                  <p className="mypage_p mypage_fail_p">{form.password.status.message}</p>
              </div>
              }
            </form>
          </div>
        );
    }
}
export default Dropout;

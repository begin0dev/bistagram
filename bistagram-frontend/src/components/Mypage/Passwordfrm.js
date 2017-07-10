import React from 'react';


const Passwordfrm = ({form, handlePwChange}) => {
  return (
     <form className="mypage_frm">
    		<div className="mypage_row_div">
    			<aside className="mypage_col_aside">
    			   <label>이전 비밀번호</label>
          </aside>
    			<div className="mypage_col_input_div">
    				<input type="password" className="mypage_col_psinput mypage_col_input_wk"
              name="prepassword" maxLength="15" onChange={handlePwChange}
              aria-required="true" value={form.password.prepassword}
            />
    			</div>
    		</div>
    		<div className="mypage_row_div">
    			<aside className="mypage_col_aside">
    			   <label>새 비밀번호</label>
          </aside>
    			<div className="mypage_col_input_div">
    				<input type="password" className="mypage_col_psinput mypage_col_input_wk"
              name="changepassword" maxLength="15" onChange={handlePwChange}
              aria-required="true" value={form.password.changepassword}
            />
    			</div>
    		</div>
    		<div className="mypage_row_div">
    			<aside className="mypage_col_aside">
    			   <label>새 비밀번호 확인</label>
          </aside>
    			<div className="mypage_col_input_div">
    				<input type="password" className="mypage_col_psinput mypage_col_input_wk"
              name="checkpassword" maxLength="15" onChange={handlePwChange}
              aria-required="true" value={form.password.checkpassword}
            />
    			</div>
    		</div>
    		<div className="mypage_row_div">
    			<aside className="mypage_col_aside">
    			<label></label>
          </aside>
    			<div className="mypage_col_input_div">
    				<div className="mypage_pw_submit_div">
    					<span className="mypage_submit_span">
                <button
                  className={`mypage_submit_size mypage_submit_blue mypage_submit_pd
                  ${form.password.prepassword && form.password.changepassword && form.password.checkpassword?'':'mypage_bluebtn_opacity'}`}
                  type="button" disabled={form.password.prepassword && form.password.changepassword && form.password.checkpassword ? '':true}
                >
                  비밀번호 변경
                </button>
              </span>
    				</div>
    			</div>
    		</div>
    	</form>
  );
}

export default Passwordfrm;

import React from 'react';


const Passwordfrm = () => {
  return (
     <form className="mypage_frm">
    		<div className="mypage_row_div">
    			<aside className="mypage_col_aside">
    			   <label>이전 비밀번호</label>
          </aside>
    			<div className="mypage_col_input_div">
    				<input type="password" className="mypage_col_psinput mypage_col_input_wk" aria-required="true" value=""/>
    			</div>
    		</div>
    		<div className="mypage_row_div">
    			<aside className="mypage_col_aside">
    			   <label>새 비밀번호</label>
          </aside>
    			<div className="mypage_col_input_div">
    				<input type="password" className="mypage_col_psinput mypage_col_input_wk" aria-required="true" value=""/>
    			</div>
    		</div>
    		<div className="mypage_row_div">
    			<aside className="mypage_col_aside">
    			   <label>새 비밀번호 확인</label>
          </aside>
    			<div className="mypage_col_input_div">
    				<input type="password" className="mypage_col_psinput mypage_col_input_wk" aria-required="true" value=""/>
    			</div>
    		</div>
    		<div className="mypage_row_div">
    			<aside className="mypage_col_aside">
    			<label></label>
          </aside>
    			<div className="mypage_col_input_div">
    				<div className="mypage_pw_submit_div">
    					<span className="mypage_submit_span">
                <button	className="mypage_submit_size mypage_submit_blue mypage_submit_pd mypage_bluebtn_opacity">비밀번호 변경</button>
              </span>
    				</div>
    			</div>
    		</div>
    	</form>
  );
}

export default Passwordfrm;

import React, { Component } from 'react';

class Passwordfrm extends Component {
    componentWillUnmount() {
      this.props.postformReset();
    }
    render() {
        const {form, handlePwChange, handlePwUpdate} = this.props;
        return(
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
                         type="button"
                         disabled={(form.password.prepassword && form.password.changepassword && form.password.checkpassword) && !form.password.status.loading ? '':true}
                         onClick={handlePwUpdate}
                       >
                         비밀번호 변경
                       </button>
                       {form.password.status.loading &&
                         <div className='loding_div loding_img'></div>
                       }
                     </span>
                   </div>
                 </div>
               </div>
               {form.password.status.message &&
               <div className="mypage_row_div">
                 <aside className="mypage_col_aside"> <label></label></aside>
                 <div className="mypage_col_input_div">
                   <p className={`mypage_p ${form.password.status.success?'mypage_success_p':'mypage_fail_p'}`}>{form.password.status.message}</p>
                 </div>
               </div>
               }
             </form>
        );
    }
}
export default Passwordfrm;

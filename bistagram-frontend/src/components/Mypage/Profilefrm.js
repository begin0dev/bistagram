import React from 'react';

const Profilefrm = ({form, handleMypageTextChange, handleProfileUpdate}) => {
  return (
    <form className="mypage_frm">
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>이름</label>
        </aside>
        <div className="mypage_col_input_div">
          <input type="text" className="mypage_col_input mypage_col_input_wk"
            name="name" maxLength="30" onChange={handleMypageTextChange}
            aria-required="false" value={form.mypage.name?form.mypage.name:''}
          />
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>사용자 이름</label>
        </aside>
        <div className="mypage_col_input_div">
          <input type="text" className="mypage_col_input mypage_col_input_wk"
            name="nickname" maxLength="30" onChange={handleMypageTextChange}
            aria-required="true" value={form.mypage.nickname}
          />
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>웹사이트</label>
        </aside>
        <div className="mypage_col_input_div">
          <input type="text" className="mypage_col_input mypage_col_input_wk"
            name="website" maxLength="50" onChange={handleMypageTextChange}
            aria-required="false" value={form.mypage.website?form.mypage.website:''}
          />
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>소개</label>
        </aside>
        <div className="mypage_col_input_div">
          <textarea className="mypage_col_ta"
            name="intro" maxLength="500" onChange={handleMypageTextChange}
            value={form.mypage.intro?form.mypage.intro:''}>
          </textarea>
        </div>
      </div>


      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label></label>
        </aside>
        <div className="mypage_col_input_div">
          <div className="mypage_h2_div">
            <h2 className="mypage_h2">개인 정보</h2>
          </div>
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>이메일</label>
        </aside>
        <div className="mypage_col_input_div">
          <input type="text" className="mypage_col_input mypage_col_input_wk"
            name="email" maxLength="30" onChange={handleMypageTextChange}
            aria-required="false" value={form.mypage.email?form.mypage.email:''}
          />
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>전화번호</label>
        </aside>
        <div className="mypage_col_input_div">
          <input type="text" className="mypage_col_input mypage_col_input_wk"
            name="phone" maxLength="30" onChange={handleMypageTextChange}
            aria-required="false" value={form.mypage.phone?form.mypage.phone:''}
          />
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>성별</label>
        </aside>
        <div className="mypage_col_input_div">
          <div className="mypage_select_div">
            <span className="mypage_select_img_pos mypage_select_img_block imgs mypage_select_downArrow"></span>
            <select className="mypage_select" name="gender" value={form.mypage.gender} onChange={handleMypageTextChange}>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mypage_row_div">
        <aside className="mypage_col_aside"> <label></label></aside>
        <div className="mypage_col_input_div">
          <div className="mypage_submit_div">
            <span className="mypage_submit_span">
              <button className="mypage_submit_size mypage_submit_blue mypage_submit_pd point"
                type="button" onClick={handleProfileUpdate} disabled={form.mypage.status.loading?true:''}>
                제출
              </button>
              {form.mypage.status.loading &&
                <div className='loding_div loding_img'></div>
              }
            </span>
          </div>
        </div>
      </div>
      {form.mypage.status.message &&
      <div className="mypage_row_div">
        <aside className="mypage_col_aside"> <label></label></aside>
        <div className="mypage_col_input_div">
          <p className={`mypage_p ${form.mypage.status.success?'mypage_success_p':'mypage_fail_p'}`}>{form.mypage.status.message}</p>
        </div>
      </div>
      }
    </form>
  );
}

export default Profilefrm;

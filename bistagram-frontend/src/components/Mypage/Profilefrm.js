import React from 'react';


const Profilefrm = () => {
  return (
    <form className="mypage_frm">
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>이름</label>
        </aside>
        <div className="mypage_col_input_div">
          <input type="text" className="mypage_col_input mypage_col_input_wk" aria-required="false" value="Sooyoung"/>
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>사용자 이름</label>
        </aside>
        <div className="mypage_col_input_div">
          <input type="text" className="mypage_col_input mypage_col_input_wk" aria-required="true" value="prosonic1"/>
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>웹사이트</label>
        </aside>
        <div className="mypage_col_input_div">
          <input type="text" className="mypage_col_input mypage_col_input_wk" aria-required="false" value=""/>
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>소개</label>
        </aside>
        <div className="mypage_col_input_div">
          <textarea className="mypage_col_ta"></textarea>
        </div>
      </div>


      <div className="mypage_row_div">
        <aside className="mypage_col_aside"> <label></label></aside>
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
          <input type="text" className="mypage_col_input mypage_col_input_wk" aria-required="false" value="prosonic1@naver.com"/>
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>전화번호</label>
        </aside>
        <div className="mypage_col_input_div">
          <input type="text" className="mypage_col_input mypage_col_input_wk" aria-required="false" value="+82 10-2102-0330"/>
        </div>
      </div>
      <div className="mypage_row_div">
        <aside className="mypage_col_aside">
          <label>성별</label>
        </aside>
        <div className="mypage_col_input_div">
          <div className="mypage_select_div">
            <span className="mypage_select_img_pos mypage_select_img_block imgs mypage_select_downArrow"></span>
            <select className="mypage_select">
              <option value="1">남성</option>
              <option value="2">여성</option>
              <option value="3">선택 안 함</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mypage_row_div">
        <aside className="mypage_col_aside"> <label></label></aside>
        <div className="mypage_col_input_div">
          <div className="mypage_submit_div">
            <span className="mypage_submit_span">
              <button className="mypage_submit_size mypage_submit_blue mypage_submit_pd point">제출</button>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Profilefrm;

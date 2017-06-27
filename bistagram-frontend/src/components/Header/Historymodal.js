import React from 'react';

import Historyli from './Historyli';

const Historymodal = ({ui, userinfo, history}) => {
  return (
    <div>
      <div className="history_triangle"></div>
      <div className="history_triangle_link"></div>
      <div className="history_body">
        {history.histories.length===0?
          <div className="no_history_div">
            <div className="no_history_text_bold">게시물 관련 최근 활동</div>
            <div className="no_history_text">누군가 회원님의 사진이나 동영상에 댓글을 남기거나 좋아요를 누르면 여기에 표시됩니다.</div>
          </div>
        :
        <ul>
        {history.histories.map((contact, i) => {
          return(
            <Historyli
              history={contact}
              key={i}
            />
          )}
        )}
        </ul>
      }
      </div>
    </div>
  );
}

export default Historymodal;

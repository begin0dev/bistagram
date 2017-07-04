import React from 'react';
import Textarea from 'react-textarea-autosize';

import Modalcontent from './Modalcontent';

const Modalfooter = ({search}) => {
    return (
      <div className="modal_footer_root">

        <section className="modal_likeclick_section">
          <button className="like_abtn like_abtn_mgpd" disabled>
            {search.modalpost.atclike.like===1 ?
              (<span className="imgs like_abtn_onoffimg like_abtn_img">좋아요</span>):
              (<span className="imgs like_abtn_onoffimg notlike_abtn_img">안좋아요</span>)
            }
          </button>
          <a className="reply_abtn" role="button" aria-disabled="false">
              <span className="imgs like_abtn_onoffimg reply_abtn_img">댓글달기</span>
          </a>
        </section>

        <section className="modal_likecount_section">
          <div className="like_countview_wrapper fontcolor_black">
            <span className="fontweight_600">
              좋아요 <span>{search.modalpost.atclike.likecount}</span>개
            </span>
          </div>
        </section>

        <Modalcontent
          post={search.modalpost}
        />

        <section className="modal_replyta_section">
          <form className="modal_reply_form" autoComplete="off" >

            <div className='loding_div loding_img'></div>

            <Textarea name="content" className="modal_reply_ta"
              aria-label="댓글 달기..." placeholder="댓글 달기...">
            </Textarea>
          </form>
        </section>
      </div>
    )
}

export default Modalfooter;

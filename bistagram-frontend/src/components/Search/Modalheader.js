import React from 'react';

import noimg from '../../img/noimg.jpg';

const Modalheader = ({search}) => {
    return (
      <header className="modal_header modal_header_position">
        <a className="profile_img_circle profile_img_a profile_img_size">
          <img src={noimg} className="postview_profileimg img_100" alt=""></img>
        </a>
        <div className="modal_header_nickdiv">
          <a className="modal_header_nicka">{search.modalpost.nickname}</a>
        </div>
        <span className="modal_header_followsp">
          <button className="bluebtn btnstyle">팔로우</button>
        </span>
      </header>
    )
}

export default Modalheader;
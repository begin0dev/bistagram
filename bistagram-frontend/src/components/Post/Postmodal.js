import React from 'react';

const style={
  position: 'relative',
  zIndex: 2,
  display:'none'
}

const Postmodal = ({media, handleImgLoad}) => {
    return (
      <div style={style}>
      	<div className="modal_root" role="dialog">
      		<div className="modal_wrap">
      			<div className="modal_center">
      				<ul className="modal_UlPosition" role="menu">
      					<li className="modal_LiStyle">
      						 <button className="modal_listBtn">삭제</button>
      					</li>
      					<li className="modal_LiStyle">
      						 <button className="modal_listBtn">취소</button>
      					</li>
      				</ul>
      			</div>
      		</div>
      		<button className="modal_canclebtn">닫기</button>
      	</div>
      </div>
    )
}

export default Postmodal;

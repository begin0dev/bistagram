import React, { Component } from 'react';

class Innermodal extends Component {
    handleClickOutside = (e) =>{
      const {handleInnerModal} = this.props;
      if((this.innermodal_list && !this.innermodal_list.contains(e.target)) || this.innermodal_cancle.contains(e.target)){
        handleInnerModal();
      }
    }
    render() {
        const style={
          position: 'relative',
          zIndex: 3
        }
        const {handleSearchModal} = this.props;
        return(
          <div style={style}>
            <div className="modal_root" role="dialog" onClick={this.handleClickOutside}>
              <div className="modal_wrap">
                <div className="modal_center">
                  <ul className="modal_UlPosition" role="menu"
                    ref={(node) => { this.innermodal_list = node }}>

                    <li className="modal_LiStyle">
                       <button className="modal_listBtn">
                         퍼가기
                       </button>
                    </li>

                    <li className="modal_LiStyle">
                       <button className="modal_listBtn" onClick={()=>handleSearchModal(-1)}>
                         게시물 닫기
                       </button>
                    </li>

                    <li className="modal_LiStyle" ref={(li) => { this.innermodal_cancle = li }}>
                       <button className="modal_listBtn">취소</button>
                    </li>
                  </ul>
                </div>
              </div>
              <button className="modal_canclebtn">닫기</button>
            </div>
          </div>
        );
    }
}
export default Innermodal;

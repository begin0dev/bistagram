import React, { Component } from 'react';

class Postmodal extends Component {
    handleClickOutside = (e) =>{
        const { handleModal } = this.props;
        if(this.deletebtn !== e.target) {
          handleModal(-1);
        }
    }
    render() {
        const style={
          position: 'relative',
          zIndex: 3
        }
        const {deletePossible, lodingpost, handleDeletePost}=this.props;
        return(
          <div style={style}>
            <div className="modal_root" role="dialog" onClick={this.handleClickOutside}>
              <div className="modal_wrap">
                <div className="modal_center">
                  <ul className="modal_UlPosition" role="menu">
                    {deletePossible &&
                    <li className="modal_LiStyle">
                       <button className="modal_listBtn"
                       ref={(button) => { this.deletebtn = button }}
                       onClick={handleDeletePost}
                       disabled={`${lodingpost?true:''}`}>삭제</button>
                    </li>
                    }
                    <li className="modal_LiStyle">
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
export default Postmodal;

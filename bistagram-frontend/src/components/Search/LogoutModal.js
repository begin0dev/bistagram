import React, { Component } from 'react';

class LogoutModal extends Component {
    handleClickOutside = (e) =>{
      const {handleLogoutModal} = this.props;
      if(!this.modalListUl.contains(e.target)){
        handleLogoutModal(false);
      }
    }
    handleModalCancle = () =>{
      this.props.handleLogoutModal(false);
    }
    render() {
        const style={
          position: 'relative',
          zIndex: 3
        }
        const {handleLogout}=this.props;
        return(
          <div style={style}>
            <div className="modal_root" role="dialog" onClick={this.handleClickOutside}>
              <div className="modal_wrap">
                <div className="modal_center">
                  <ul className="modal_UlPosition" role="menu" ref={(ul) => { this.modalListUl = ul }}>

                    <li className="modal_LiStyle">
                       <button className="modal_listBtn" onClick={handleLogout}>
                          로그아웃
                       </button>
                    </li>
                    <li className="modal_LiStyle">
                       <button className="modal_listBtn" onClick={this.handleModalCancle}>
                          취소
                       </button>
                    </li>

                  </ul>
                </div>
              </div>
              <button className="modal_canclebtn">
                닫기
              </button>
            </div>
          </div>
        );
    }
}
export default LogoutModal;

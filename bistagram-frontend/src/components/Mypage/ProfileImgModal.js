import React, { Component } from 'react';

class ProfileImgModal extends Component {
    handleClickOutside = (e) =>{
      const {handleProfileModal} = this.props;
      if(!this.modalListUl.contains(e.target)){
        handleProfileModal(false);
      }
    }
    handleModalCancle = () =>{
      this.props.handleProfileModal(false);
    }
    render() {
        const style={
          position: 'relative',
          zIndex: 3
        }
        const {handleProfileClick, handleProfileImgDelete}=this.props;
        return(
          <div style={style}>
            <div className="modal_root" role="dialog" onClick={this.handleClickOutside}>
              <div className="modal_wrap">
                <div className="modal_center">
                  <ul className="modal_UlPosition" role="menu" ref={(ul) => { this.modalListUl = ul }}>

                    <li className="modal_LiStyle modal_list_title">
                      프로필 사진 바꾸기
                    </li>
                    <li className="modal_LiStyle">
                       <button className="modal_listBtn" onClick={handleProfileImgDelete}>
                          현재 사진 삭제
                       </button>
                    </li>
                    <li className="modal_LiStyle">
                       <button className="modal_listBtn" onClick={handleProfileClick}>
                          사진 업로드
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
export default ProfileImgModal;

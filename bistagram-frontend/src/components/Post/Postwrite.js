import React, { Component } from 'react';

import noimg from '../../img/noimg.jpg';

class Postwrite extends Component {
    constructor(props) {
        super(props);
    }
    handleFileClick = () =>{

    }
    render() {
        return(
          <div className="border_gray2 post_marginbt30px">
        		<form encType="multipart/form-data">
        			<div className="writehead_div">
        				<h2 className="h2_title">게시물 작성</h2>
        				<div className="btnrow">
        					<div className="headbtn1_div">
        						<button type="button" className="bluebtn btnstyle point txt_right">
                    <i className="headbtn_img"></i>사진/동영상 추가
                    </button>
        					</div>
        					<div className="headbtn2_div">
        						<button type="button" className="bluebtn btnstyle point marginlf_5">게시</button>
        					</div>
        				</div>
        			</div>
        			<div className="writebody_div">
        				<div className="writebody_txt">
        					<div className="write_profileimg">
        						<div className="write_imgsize_div">
        							<img src={noimg} className="img_100" alt=''></img>
        						</div>
        					</div>
        					<div className="write_txtareadiv">
        						<textarea name="content" className="txt_areastyle"
                    aria-label="여기에 게시물을 작성하세요..." placeholder="여기에 게시물을 작성하세요..."
                    value=''></textarea>
        					</div>
        				</div>
        				<div className="media_view">
        					<div className="media_wrapper">
        							<div className="writebody_media">
        								<div className="mediaadd_btn point">	</div>
        							</div>
        					</div>
        				</div>
        			</div>
        			<input type="file" name="mediaList" style={{display:'none'}}
              accept="video/*, image/*" multiple="multiple"
              ref={(textarea) => { this.contenttextarea = textarea }}/>
        		</form>
        	</div>
        );
    }
}
export default Postwrite;

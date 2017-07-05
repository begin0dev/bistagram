import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import noimg from '../../img/noimg.jpg';

import Dragitem from './Dragitem';

const removeTag = (reply) => {
	return reply.replace(/(<([^>]+)>)/gi, "");
}

@DragDropContext(HTML5Backend)
class Postwrite extends Component {
    handleChangeContent = (e) =>{
      const {post, changeFormData} = this.props;
      if(post.content.length < 1000){
        changeFormData({form: 'post', name: 'content', value: e.target.value});
      }
    }
    handleDragMedia = (lastX, nextX) =>{
      this.props.moveMedia({lastX:lastX, nextX:nextX});
    }
    handleDeleteMedia = (index) =>{
      this.props.deleteMedia({index: index})
    }
    handleFileClick = () =>{
      this.fileInput.click();
    }
    handleFileChange = (e) =>{
      e.preventDefault();
			const {post} = this.props;
      let files = e.target.files;
      for(let i=0; i<files.length; i++){
				if(post.media.length<7 && post.media.length+i+1<7){
					this.handleMedieRender(files[i]);
				}else{
					alert("최대 업로드 갯수는 6개입니다.")
				}
      }
			e.target.value='';
    }
    handleMedieRender = (file) =>{
      const {setPostMedia} = this.props;
      let reader = new FileReader();
      reader.onloadend = () => {
        setPostMedia({media: file, media_url: reader.result});
      }
      reader.readAsDataURL(file);
    }
    handlePostSubmit = async(e) => {
      e.preventDefault();
      const {post, uploadPost, postformReset} = this.props;
      let formdata=new FormData();
      formdata.append('content', removeTag(post.content))
      post.media.forEach(function(file){
        formdata.append('media', file)
      })
      await uploadPost(formdata).then(()=>postformReset());
    }
    render() {
        const { post, upload } = this.props;
        return(
          <div className="border_gray2 post_marginbt20px">
        		<form encType="multipart/form-data">
        			<div className="writehead_div">
        				<h2 className="h2_title">게시물 작성</h2>
        				<div className="btnrow">
        					<div className="headbtn1_div marginrt_5">
        						<button type="button" className="bluebtn btnstyle point txt_right"
                    onClick={this.handleFileClick}>
                    <i className="headbtn_img"></i>사진/동영상 추가
                    </button>
        					</div>
        					<div className="headbtn2_div">
        						<button type="button" className="bluebtn btnstyle point"
                    onClick={this.handlePostSubmit}
                    disabled={`${upload?true:''}`}>
                    게시
                    </button>
                    {upload&&
                      <div className='loding_div loding_img'></div>
                    }
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
                    value={post.content} onChange={this.handleChangeContent}></textarea>
        					</div>
        				</div>

                {post.media.length >0 &&
          				<div className="media_view">
          					<div className="media_wrapper">
        							<div className="writebody_media">

                        {post.media.map((contact, i) => {
                          return(
                            <Dragitem
                              id={contact.name}
                              key={i}
                              index={i}
                              media={contact}
                              media_url={post.media_url[i]}
                              handleDragMedia={this.handleDragMedia}
                              handleDeleteMedia={this.handleDeleteMedia}
                            />
                          );
                        })}

        								<div className="mediaadd_btn point" onClick={this.handleFileClick}></div>
        							</div>
          					</div>
          				</div>
                }
        			</div>
        			<input type="file" name="mediaList" style={{display:'none'}}
              accept="video/*, image/*" multiple="multiple"
              ref={(input) => { this.fileInput = input }}
              onChange={this.handleFileChange}/>
        		</form>
        	</div>
        );
    }
}

export default Postwrite;

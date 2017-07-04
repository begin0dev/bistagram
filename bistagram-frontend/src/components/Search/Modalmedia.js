import React, { Component } from 'react';

import Modalpaging from './Modalpaging'

import Imgview from '../Post/Imgview'
import Videoview from '../Post/Videoview'

class Modalmedia extends Component {
    constructor(props) {
        super(props);
        this.state={
          index: 0,
          play: false,
          style: {paddingBottom : '100%'}
        }
    }
    handleAftBfClick = (e) => {
      if(e.target === this.bfbtn){
        this.setState(prevState => ({
          ...this.state,
          index:prevState.index-1,
          play: false
        }));
      }
      if(e.target === this.aftbtn){
        this.setState(prevState => ({
          ...this.state,
          index:prevState.index+1,
          play: false
        }));
      }
    }
    playVideo = () => {
      let video=this.videoRef;
      video.paused ? video.play() : video.pause();
      this.setState({
        ...this.state,
        play: !this.state.play
      });
    }
    handleImgLoad = ({target:img}) =>{
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      let heightper = height*100/width;
      if(heightper<75){	heightper ='75'	}
      else if(heightper>123){	heightper ='123'}
      this.setState({
        ...this.state,
        style:{
          ...this.state.style,
          paddingBottom:`${heightper}%`
        }
      });
    }
    render() {
        const {search} = this.props;
        const {index, play} = this.state;
        return(
          <div className="modal_media_body">
            <div>

              <div className="modal_media_frame">
                <div className="postview_body" style={this.state.style}>
                  {search.modalpost.media[index].mediatype!==null && search.modalpost.media[index].mediatype.match("image") ?
                  <Imgview
                    media={search.modalpost.media[index]}
                    handleImgLoad={this.handleImgLoad}
                  />
                  :
                  <Videoview
                    media={search.modalpost.media[index]}
                    videoRef={video => this.videoRef = video}
                  />}
                </div>
                {search.modalpost.media[index].mediatype!==null && search.modalpost.media[index].mediatype.match("video") ?
                  <a className="videoPlay_a" role="button" onClick={this.playVideo}> </a>:null
                }
                {search.modalpost.media.length > 1 && index !== 0 ?
                    <a className="imgs media_afterbefore_btn media_before_btn"
                    ref={ref => this.bfbtn = ref} role="button"
                    onClick={this.handleAftBfClick}>before</a>:
                    null
                }
                {search.modalpost.media.length > 1 && index !== search.modalpost.media.length-1 ?
                    <a className="imgs media_afterbefore_btn media_after_btn"
                    ref={ref => this.aftbtn = ref} role="button"
                    onClick={this.handleAftBfClick}>after</a>:
                    null
                }
                {search.modalpost.media[index].mediatype!==null && search.modalpost.media[index].mediatype.match('video') ?
                    <a className={`media_play_btn media_play_btn_img ${play?'':'media_play_btn_hover'}`}
                    onClick={this.playVideo}
                    role="button">play</a>
                :null}

                {search.modalpost.media.length>1&&
                <Modalpaging
                  index={index}
                  search={search}
                />
                }
              </div>

            </div>
          </div>
        );
    }
}
export default Modalmedia;
